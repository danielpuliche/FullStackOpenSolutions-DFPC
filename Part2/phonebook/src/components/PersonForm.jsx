import Input from "./Input";

const PersonForm = ({
  handleNewName,
  newName,
  handleNewNumber,
  newNumber,
  handleSubmit,
}) => {
  return (
    <form>
      <Input text={"Name: "} handler={handleNewName} value={newName} />
      <Input text={"Number: "} handler={handleNewNumber} value={newNumber} />
      <div>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;
