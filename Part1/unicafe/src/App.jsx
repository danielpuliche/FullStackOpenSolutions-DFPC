import { useState } from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import Stat from "./components/Stat";

function App() {
  // Save clicks of each button
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <Title title={"Give feedback"} />
        <Button handleClick={handleClickGood} text={"Good"} />
        <Button handleClick={handleClickNeutral} text={"Neutral"} />
        <Button handleClick={handleClickBad} text={"Bad"} />
      </div>
      <div>
        <Title title={"Statistics"}/>
        <Stat text={"Good"} value={good}/>
        <Stat text={"Neutral"} value={neutral}/>
        <Stat text={"Bad"} value={bad}/>
      </div>
    </div>
  );
}

export default App;
