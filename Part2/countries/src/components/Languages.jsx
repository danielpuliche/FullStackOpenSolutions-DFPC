const Languages = ({ languages }) => {
  return (
    <div>
      <h2>Languages </h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
