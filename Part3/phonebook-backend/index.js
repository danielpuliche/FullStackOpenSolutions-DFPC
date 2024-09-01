const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

// Token for the personalized POST format
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const postFormat =
  ":method :url :status :res[content-length] - :response-time ms - :body";

// Set the format for the morgan middleware
app.use((req, res, next) => {
  if (req.method === "POST") {
    morgan(postFormat)(req, res, next);
  } else {
    morgan("tiny")(req, res, next);
  }
});

// ===================================================================================

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// ===================================================================================
// Functions used by the routes

const generatedIds = new Set();

const generateId = () => {
  let id;

  do {
    id = Math.random().toString(36).substring(2, 9);
  } while (generatedIds.has(id));

  generatedIds.add(id);
  return id;
};

// ===================================================================================
// Routes

app.get("/info", (request, response) => {
  const currentDate = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "Name and number are required fields.",
    });
  }

  const nameExists = persons.some((person) => person.name === name.trim());

  if (nameExists) {
    return res.status(409).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: name,
    number: number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.status(201).json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (persons.some((person) => person.id === id)) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

// ===================================================================================
// Run the server

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
