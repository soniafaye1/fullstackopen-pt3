const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://soniafaye1:${password}@cluster0.bh96y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name,
  number,
});

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  console.log("phonebook: ");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`${result.name} ${result.number} saved!`);
    mongoose.connection.close();
  });
}
