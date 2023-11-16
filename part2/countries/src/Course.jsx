const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Content = ({ parts }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0);

  return (
    <div>
      {parts.map(part => (
        <>
          <Part key={part.id} part={part} />
        </>
      ))}
      <b>Total of {total} exercises</b>
    </div>
  );
};

const Part = ({ part }) => (
  <>
    <p>
      {part.name} {part.exercises}
    </p>
  </>
);

const Header = ({ name }) => <h3>{name}</h3>;

export default Course;
