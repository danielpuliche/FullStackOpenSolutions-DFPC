import Flag from "./Flag";
import InfoCountrie from "./InfoCountrie";
import Languages from "./Languages";
import WeatherSection from "./WeatherSection";

const Countrie = ({ countrie = {}, weather }) => {
  const { languages = { def: "Does not have a language registered" } } =
    countrie;

  const name = countrie.name;
  const capitals = countrie.capital;
  const area = countrie.area;
  const languagesList = Object.values(languages);
  const flag = countrie.flags;

  return (
    <div>
      <h1>{name}</h1>
      <InfoCountrie capitals={capitals} area={area} />
      <Languages languages={languagesList} />
      <Flag flags={flag} countrieName={name} />
      <WeatherSection
        weather={weather}
        capitalName={capitals === undefined ? name : capitals[0]}
      />
    </div>
  );
};

export default Countrie;
