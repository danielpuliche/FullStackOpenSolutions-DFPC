import { useState } from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState("0%");

  const handleClickGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);
    calculateAverage(updatedGood, bad, updatedAll);
  };

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = good + updatedNeutral + bad;
    setAll(updatedAll);
    calculateAverage(good, bad, updatedAll);
  };

  const handleClickBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = good + neutral + updatedBad;
    setAll(updatedAll);
    calculateAverage(good, updatedBad, updatedAll);
  };

  const calculateAverage = (updatedGood, updatedBad, updatedAll) => {
    const sum = updatedGood - updatedBad;
    const avg = sum / updatedAll;
    setAverage(avg);
    calculatePositive(updatedGood, updatedAll);
  };

  const calculatePositive = (updatedGood, updatedAll) => {
    const positiveRate = 100 * (updatedGood / updatedAll);
    setPositive(positiveRate + " %");
  };

  return (
    <div>
      <div>
        <Title title={"Give feedback"} />
        <Button handleClick={handleClickGood} text={"Good"} />
        <Button handleClick={handleClickNeutral} text={"Neutral"} />
        <Button handleClick={handleClickBad} text={"Bad"} />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}

export default App;
