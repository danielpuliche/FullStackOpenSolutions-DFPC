import { useState } from "react";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleAdd = (event) => {
    event.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: persons.length + 1,
      };
      if (checkName(newPerson))
        alert(`${newName.trim()} is already added to phonebook`);
      else {
        const newPersons = persons.concat(newPerson);
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
        filter(filterWord, newPersons);
      }
    } else alert(`There's an empty field.`);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const checkName = (newPerson) => {
    return persons.some((person) => person.name === newPerson.name);
  };

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with:{" "}
          <input onChange={handleFilter} value={filterWord} />
        </div>
        <h2>Add a new contact</h2>
        <div>
          Name: <input onChange={handleNewName} value={newName} />
        </div>
        <div>
          Number: <input onChange={handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            Add
          </button>
        </div>
      </form>
      <Contacts persons={filteredPersons} />
    </div>
  );
};

export default App;
