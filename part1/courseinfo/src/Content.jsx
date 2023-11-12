const Content = props => {
  return (
    <div>
      <Part content={props.parts[0]} />
      <Part content={props.parts[1]} />
      <Part content={props.parts[2]} />
    </div>
  );
};

const Part = props => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
};


const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0,
  // })

  const History = props => {
    if (props.allClicks.length === 0) {
      return <div>the app is used by presssing the buttons</div>;
    }
    return <div>button press History: {props.allClicks.join(' ')}</div>;
  };
  
  const Button = (props) => {
    console.log(props)
    const { handleClick, text } = props
   return (
    <button onClick={handleClick}>{text}</button>
   )
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
    // setClicks({ ...clicks, left: clicks.left + 1 })
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
    setTotal(left + right);
    // setClicks({ ...clicks, right: clicks.right + 1 })
  };

  return (
    <div>
      {left}
        <Button handleClick={handleLeftClick} text={'left'}/>
        <Button handleClick={handleRightClick} text={'right'}/>
      {right}

      <History allClicks={allClicks} />
    </div>
  );
};
export default Content
