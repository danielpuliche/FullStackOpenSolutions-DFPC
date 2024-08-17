import Input from "./Input";

const Filter = ({ handler, valueInput }) => {
  return (
    <Input text={"Filter shown with: "} handler={handler} value={valueInput} />
  );
};

export default Filter;
