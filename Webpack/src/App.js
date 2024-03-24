import React, { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([])

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={() => handleClick()}>press</button>
    </div>
  );
};

export default App;
