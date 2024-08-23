const CountriesList = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map((countrie) => (
        <p key={countrie.name}>
          {countrie.name}
          <button onClick={() => handleClick(countrie.name)}>Show</button>
        </p>
      ))}
    </div>
  );
};

export default CountriesList;
