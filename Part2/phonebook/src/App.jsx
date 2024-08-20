import { useState, useEffect } from "react";

// Components
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

// Services
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  // Update number
  const updatePersonNumber = (personName, newNumber) => {
    const personToChange = persons.find((person) => person.name === personName);
    const updatedPerson = {
      ...personToChange,
      number: newNumber,
    };

    personService
      .updateNumber(updatedPerson, personToChange.id)
      .then((returnedPerson) => {
        const newPersons = persons
          .filter((person) => person.id !== returnedPerson.id)
          .concat(returnedPerson);
        setPersons(newPersons);
        filter(filterWord, newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        alert("Error updating number");
        console.log(err);
      });
  };

  // Add new person
  const addNewPerson = (newName, newNumber) => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        filter(filterWord, newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => alert("Error adding a new contact"));
  };

  // Handle Delete
  const handleDelete = (person) => {
    if (confirm(`Delete to '${person.name}'?`)) {
      personService
        .deleteObject(person.id)
        .then((deletedPerson) => {
          const newPersons = persons.filter(
            (person) => person.id !== deletedPerson.id
          );
          setPersons(newPersons);
          filter(filterWord, newPersons);
        })
        .catch((err) => alert("Error deleting person"));
    }
  };

  // Hander add new contact button
  const handleAdd = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert(`There's an empty field.`);
    } else if (checkName(newName.trim())) {
      if (
        confirm(
          `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePersonNumber(newName.trim(), newNumber.trim());
      }
    } else {
      addNewPerson(newName.trim(), newNumber.trim());
    }
  };

  // ===== Handlers for the input changes
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // ===== Handler for the filter
  const handleFilter = (event) => {
    const newFilterWord = event.target.value;
    filter(newFilterWord, persons);
  };

  const filter = (word, array) => {
    const fP = array.filter((person) =>
      person.name.toLowerCase().includes(word.toLowerCase())
    );
    setFilterWord(word);
    setFilteredPersons(fP);
  };

  // Check if the name is not repeated
  const checkName = (newName) => {
    return persons.some((person) => person.name === newName);
  };

  // ====== Render section
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} valueInput={filterWord} />
      <h3>Add a new contact</h3>
      <PersonForm
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Contacts persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
