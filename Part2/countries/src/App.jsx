import { useEffect, useState } from "react";
import CountriesSection from "./components/CountriesSection";
import countriesService from "./services/countriesService";
import Input from "./components/Input";
import weatherService from "./services/weatherService";

const App = () => {
  const [searchWord, setSearchWord] = useState("");
  const [countries, setCountries] = useState(null);
  const [countriesFiltered, setCountriesFiltered] = useState(null);
  const [isOnlyOne, setIsOnlyOne] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countriesReturned) => {
      createCountries(countriesReturned);
      console.log("Countries effect aplied");
    });
  }, []);

  useEffect(() => {
    if (isOnlyOne) {
      const [lat, lng] = getLatLng(countriesFiltered[0]);
      weatherService.getWeatherWithLocation(lat, lng).then((response) => {
        createWeather(response);
        console.log("Weather effect applied");
      });
    } else {
      setWeather(null);
    }
  }, [isOnlyOne]);

  const getLatLng = (countrie) => {
    let [lat, lng] = [null, null];
    const keys = Object.keys(countrie.capitalInfo);
    if (keys.length === 0) {
      [lat, lng] = countrie.latlng;
    } else {
      [lat, lng] = countrie.capitalInfo.latlng;
    }
    return [lat, lng];
  };

  const countriesFilter = (filterWord) => {
    if (countries !== null) {
      const filteredArray = countries.filter((countrie) =>
        countrie.name.toLowerCase().includes(filterWord.trim().toLowerCase())
      );
      setCountriesFiltered(filteredArray);
      setIsOnlyOne(filteredArray.length === 1);
    }
  };

  const createCountries = (countriesList) => {
    const newCountries = countriesList.map(
      ({ name, capital, area, languages, flags, capitalInfo, latlng }) => ({
        name: name.common,
        capital,
        area,
        languages,
        flags,
        capitalInfo,
        latlng,
      })
    );
    setCountries(newCountries);
    setCountriesFiltered(newCountries);
  };

  const createWeather = (weatherResponse) => {
    const newWeather = {
      temperature: weatherResponse.main.temp,
      icon: weatherResponse.weather[0].icon,
      windSpeed: weatherResponse.wind.speed,
    };
    setWeather(newWeather);
  };

  const handleInput = (word) => {
    setSearchWord(word);
    countriesFilter(word);
  };

  if (countries === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <>
        <Input
          text={"Find countries: "}
          value={searchWord}
          handler={handleInput}
        />
        <CountriesSection
          countries={countriesFiltered}
          handleClick={handleInput}
          weather={weather}
        />
      </>
    );
  }
};

export default App;
