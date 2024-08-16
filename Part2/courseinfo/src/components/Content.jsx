import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  let total = 0;

  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises;
  }

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} text={part.name} value={part.exercises} />
      ))}
      <Total total={total} />
    </div>
  );
};

export default Content;
