const express = require("express");
const app = express();
var morgan = require("morgan");

app.use(express.json());
app.use(morgan("combined"));
let persons = [
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
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<h2>phonebook has info for ${
      persons.length
    } people</h2><h2>${new Date().toISOString()}</h2>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((e) => e.id === personId);
  person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((e) => e.id !== personId);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const personName = persons.find((e) => e.name === person.name);

  if (!person.name) {
    return response.status(400).json({ error: "missing name" });
  }
  if (!person.number) {
    return response.status(400).json({ error: "missing number" });
  }
  console.log(personName == undefined ? "hola" : "no es unde");
  if (personName !== undefined) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100),
    name: person.name,
    number: person.number,
  };
  persons = [...persons, newPerson];
  response.json(newPerson);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
