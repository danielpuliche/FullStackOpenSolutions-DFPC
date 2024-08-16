import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} text={part.name} value={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
