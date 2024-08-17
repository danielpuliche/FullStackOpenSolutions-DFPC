import { useState } from "react";
import Contacts from "./components/Contacts";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    if (newName.trim() !== "") {
      const newPerson = { name: newName.trim() };
      if (checkName(newPerson))
        alert(`${newName.trim()} is already added to phonebook`);
      else {
        setPersons(persons.concat(newPerson));
        setNewName("");
      }
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
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
