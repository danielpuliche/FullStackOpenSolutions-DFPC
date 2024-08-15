import StatisticLine from "./StatisticLine";
import Title from "./Title";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        <Title title={"Statistics"} />
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <Title title={"Statistics"} />
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={all} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive} />
      </div>
    );
  }
};

export default Statistics;
