import WeatherIcon from "./WeatherIcon";

const WeatherSection = ({ weather, capitalName }) => {
  if (weather === null) {
    return (
      <div>
        <h1>Loading weather...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather in {capitalName}</h1>
        <p>Temperature: {weather.temperature} Celsius</p>
        <WeatherIcon icon={weather.icon} />
        <p>Wind: {weather.windSpeed} m/s</p>
      </div>
    );
  }
};

export default WeatherSection;
