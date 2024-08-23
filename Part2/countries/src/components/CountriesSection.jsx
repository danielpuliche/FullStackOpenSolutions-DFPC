import Countrie from "./Countrie";
import CountriesList from "./CountriesList";

const CountriesSection = ({ countries, handleClick, weather }) => {
  if (countries.length === 1) {
    return <Countrie countrie={countries[0]} weather={weather} />;
  }
  if (countries.length > 1 && countries.length <= 10) {
    return <CountriesList countries={countries} handleClick={handleClick} />;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return <p>Not country found</p>;
};

export default CountriesSection;
