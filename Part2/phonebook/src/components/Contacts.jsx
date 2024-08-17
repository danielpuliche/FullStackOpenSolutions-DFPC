import Contact from "./Contact";

const Contacts = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Contact key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
