import React, { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = props => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = props => (
  <>
    <StatisticLine text='good' value={props.good} />
    <StatisticLine text='neutral' value={props.neutral} />
    <StatisticLine text='bad' value={props.bad} />

    <StatisticLine text='all' value={props.totalFeedback} />
    <StatisticLine text='average' value={props.averageFeedback} />
    <StatisticLine text='positive' value={`${props.positivePercentage}%`} />
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // calculate total feedback
  const totalFeedback = good + neutral + bad;

  // calculate average feedback
  const averageFeedback = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;

  // calculate positive percentage feedback
  const positivePercentage =
    totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <section className='feed-back'>
        <h1>give feedback</h1>

        <Button text={'good'} handleClick={() => setGood(good + 1)} />
        <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)} />
        <Button text={'bad'} handleClick={() => setBad(bad + 1)} />
      </section>
      <section className='statistics'>
        <h1>statistics</h1>
        {totalFeedback > 0 ? (
          <table>
            <tbody>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                totalFeedback={totalFeedback}
                averageFeedback={averageFeedback}
                positivePercentage={positivePercentage}
              />
            </tbody>
          </table>
        ) : (
          <p>No Feedback Given</p>
        )}
      </section>
    </div>
  );
};

export default App;
