import { useState } from "react";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
      const newPerson = { name: newName.trim(), number: newNumber.trim() };
      if (checkName(newPerson))
        alert(`${newName.trim()} is already added to phonebook`);
      else {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
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
      <Contacts persons={persons} />
    </div>
  );
};

export default App;
