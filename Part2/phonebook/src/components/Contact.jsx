const Contact = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={handleDelete}>Delete</button>
  </p>
);

export default Contact;
