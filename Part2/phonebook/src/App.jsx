import { useState, useEffect } from "react";
import axios from "axios";

import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  const baseURL = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  // ===== Add a new contact
  const handleAdd = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert(`There's an empty field.`);
    } else if (checkName(newName))
      alert(`'${newName.trim()}' is already added to phonebook`);
    else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
      };

      axios.post(baseURL, newPerson).then((response) => {
        const newPersons = persons.concat(response.data);
        setPersons(newPersons);
        filter(filterWord, newPersons);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // ===== Handlers for the input changes
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // Check if the name is not repeated
  const checkName = (newName) => {
    return persons.some((person) => person.name === newName);
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
      <Contacts persons={filteredPersons} />
    </div>
  );
};

export default App;
