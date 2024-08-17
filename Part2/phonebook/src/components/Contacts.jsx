import Contact from "./Contact";

const Contacts = ({ persons }) => {
  return (
    <div>
      <div>
        {persons.map((person) => (
          <Contact key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
