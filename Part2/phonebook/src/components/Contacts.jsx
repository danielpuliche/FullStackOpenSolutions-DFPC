import Contact from "./Contact";

const Contacts = ({ persons, handleDelete }) => {
  return (
    <div>
      <div>
        {persons.map((person) => (
          <Contact
            key={person.id}
            person={person}
            handleDelete={() => handleDelete(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
