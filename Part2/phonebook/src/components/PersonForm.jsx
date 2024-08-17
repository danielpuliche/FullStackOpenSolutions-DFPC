import Input from "./Input";

const PersonForm = ({
  handleNewName,
  newName,
  handleNewNumber,
  newNumber,
  handleAdd,
}) => {
  return (
    <form>
      <Input text={"Name: "} handler={handleNewName} value={newName} />
      <Input text={"Number: "} handler={handleNewNumber} value={newNumber} />
      <div>
        <button type="submit" onClick={handleAdd}>
          Add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;
