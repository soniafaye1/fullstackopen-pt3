const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors);
app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
  const num = people.length;
  const currentdate = new Date();
  const datetime =
    currentdate.getUTCDay() +
    "/" +
    currentdate.getUTCDate() +
    "/" +
    currentdate.getUTCFullYear() +
    " @ " +
    currentdate.getUTCHours() +
    ":" +
    currentdate.getUTCMinutes() +
    ":" +
    currentdate.getUTCSeconds();
  response.send(`
    <p>Phonebook has info for ${num} people</p>
    <br/>
    <p> ${datetime}</p>
    `);
});

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = people.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  people = people.filter((p) => p.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = people.length > 0 ? Math.max(...people.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  for (const person of people) {
    console.log("person: ", person);
    if (person.name === body.name) {
      return response.status(400).json({
        error: "name must be unique",
      });
    }
  }

  if (!body.name) {
    console.log(body);
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    console.log(body);
    return response.status(400).json({
      error: "number is missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
