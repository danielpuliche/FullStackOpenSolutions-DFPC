import { useState } from "react";
import Button from "./components/Button";
import Content from "./components/Content";
import Title from "./components/Title";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const newArray = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(newArray);
  const [max, setMax] = useState(-1);

  const getMax = (points) => points.indexOf(Math.max(...points));

  const handleNext = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };

  const handleVote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected]++;
    setPoints(pointsCopy);
    const maxIndex = getMax(pointsCopy);
    setMax(maxIndex);
  };

  return (
    <div>
      <div>
        <Title text={"Anecdote of the day"} />
        <Content anecdotes={anecdotes} selected={selected} points={points} />
        <Button handler={handleVote} text={"Vote"} />
        <Button handler={handleNext} text={"Next anecdote"} />
      </div>
      <div>
        <Title text={"Anecdote with most votes"} />
        <Content anecdotes={anecdotes} selected={max} points={points} />
      </div>
    </div>
  );
};

export default App;
