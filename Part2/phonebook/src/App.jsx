import { useState, useEffect } from "react";

// Components
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

// Services
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  // Filter function
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

  // Send notification
  const sendNotification = (type, message) => {
    setNotificationMessage({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setNotificationMessage({ type: null, message: null });
    }, 3500);
  };

  // Reset states
  const resetStates = (newPersons) => {
    setPersons(newPersons);
    filter(filterWord, newPersons);
    setNewName("");
    setNewNumber("");
  };

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
        resetStates(newPersons);
        sendNotification("Success", `'${returnedPerson.name}' number updated`);
      })
      .catch((err) => {
        if (err.response.status === 404)
          sendNotification(
            "Error",
            `Information of '${personToChange.name}' has already been removed from the server`
          );
        else sendNotification("Error", err.response.data.error);
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
        resetStates(newPersons);
        sendNotification("Success", `Added '${returnedPerson.name}'`);
      })
      .catch((error) => {
        sendNotification("Error", error.response.data.error);
      });
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
          resetStates(newPersons);
          sendNotification("Success", `Deleted '${deletedPerson.name}'`);
        })
        .catch(() => sendNotification("Error", "Error deleting the contact"));
    }
  };

  // Handle form submit
  const handleSubmit = (event) => {
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

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const newFilterWord = event.target.value;
    filter(newFilterWord, persons);
  };

  // ====== Render section
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        type={notificationMessage.type}
        message={notificationMessage.message}
      />
      <Filter handler={handleFilter} valueInput={filterWord} />
      <h3>Add a new contact</h3>
      <PersonForm
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Contacts persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
