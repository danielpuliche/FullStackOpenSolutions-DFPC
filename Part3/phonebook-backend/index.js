const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Get Person schema from MongoDB and get connection
const Person = require("./models/person");

// Token for the personalized POST format
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const postFormat =
  ":method :url :status :res[content-length] - :response-time ms - :body";

app.use(express.static("./dist"));
app.use(express.json());
app.use(cors());

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

// app.get("/info", (request, response) => {
//   const currentDate = new Date();
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`
//   );
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(404).json({ error: "Person not found" });
    });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "Name and number are required fields.",
    });
  }

  // const nameExists = persons.some((person) => person.name === name.trim());

  // if (nameExists) {
  //   return res.status(409).json({
  //     error: "Name must be unique",
  //   });

  // }

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    res.status(201).json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (persons.some((person) => person.id === id)) {
    const deletedPerson = persons.find((person) => person.id === id);
    persons = persons.filter((person) => person.id !== id);

    console.log(deletedPerson);
    response.status(200).json(deletedPerson);
  } else {
    response.status(404).end();
  }
});

// ===================================================================================
// Run the server

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
