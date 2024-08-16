import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  console.log(course.name);
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
