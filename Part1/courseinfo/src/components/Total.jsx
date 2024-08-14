const Total = (props) => {
  const total_array = props.total;
  const sum = total_array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return <p>Number of exercises {sum}</p>;
};

export default Total;
