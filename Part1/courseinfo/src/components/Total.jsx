const Total = (props) => {
  const parts = props.parts;
  let sum = 0;

  parts.forEach((part) => {
    sum += part.exercises;
  });

  return <p>Number of exercises {sum}</p>;
};

export default Total;
