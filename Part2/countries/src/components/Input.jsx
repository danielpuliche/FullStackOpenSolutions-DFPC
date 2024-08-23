const Input = ({ text, value, handler }) => {
  return (
    <div>
      {text}
      <input onChange={(event) => handler(event.target.value)} value={value} />
    </div>
  );
};

export default Input;
