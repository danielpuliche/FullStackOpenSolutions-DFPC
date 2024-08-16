import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

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
