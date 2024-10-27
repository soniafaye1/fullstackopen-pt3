const express = require("express");
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

app.use(express.json());

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

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("body ", body);
  response.json(body);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
