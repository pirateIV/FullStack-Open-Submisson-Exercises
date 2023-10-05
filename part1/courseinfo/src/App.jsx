import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const course = "Half stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const courseContent = [
    { part: part1, exercise: exercises1 },
    { part: part2, exercise: exercises2 },
    { part: part3, exercise: exercises3 },
  ];
  return (
    <div>
      <Header course={course} />
      <Content arr={courseContent} />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
