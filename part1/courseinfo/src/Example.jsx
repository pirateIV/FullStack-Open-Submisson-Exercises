/*
{const Hello = ({ name, age }) => {
  // const name = props.name
  // const age = props.age

  // Destructuring make the assignment of variables even easier since we can use to extract and gather values of an object properties
  // into seperate variables
  // const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <>
      <div>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={name} age={age} />
      </div>
    </>
  );
};*/

const App = (props) => {
  const { count }  = props
  return (
    <React.Fragment>
      <div>
        <p>{count}</p>
      </div>
    </React.Fragment>
  )
}