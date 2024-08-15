import Stat from "./Stat";
import Title from "./Title";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <Title title={"Statistics"} />
      <Stat text={"Good"} value={good} />
      <Stat text={"Neutral"} value={neutral} />
      <Stat text={"Bad"} value={bad} />
      <Stat text={"All"} value={all} />
      <Stat text={"Average"} value={average} />
      <Stat text={"Positive"} value={positive} />
    </div>
  );
};

export default Statistics;
