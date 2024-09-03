const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

// Get Person schema from MongoDB and get connection
const Person = require("./models/person");

app.use(express.static("./dist"));
app.use(cors());
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
// Routes

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const currentDate = new Date();
      res.send(
        `<p>Phonebook has info for ${count} people</p><p>${currentDate}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (name === undefined || number === undefined) {
    return res.status(400).json({
      error: "Name and number are required fields.",
    });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) => {
      res.status(200).json(deletedPerson);
    })
    .catch((error) => next(error));
});

// ===================================================================================
// For unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Uknown endpoint" });
};

app.use(unknownEndpoint);

// ===================================================================================
// Error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

// ===================================================================================
// Run the server

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
