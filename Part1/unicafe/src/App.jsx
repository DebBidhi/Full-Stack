import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Heading text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} style={{margin: '0px 2px'}}>{text}</button>
)
const Heading = ({text})=> <h1>{text}</h1>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const calculateAverage = () => (good - bad) / total;
  const calculatePositive = () => (good / total) * 100;

  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td><StatisticsLine value={good} /></td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td><StatisticsLine value={neutral} /></td>
        </tr>
        <tr>
          <td>Bad</td>
          <td><StatisticsLine value={bad} /></td>
        </tr>
        <tr>
          <td>All</td>
          <td><StatisticsLine value={total} /></td>
        </tr>
        <tr>
          <td>Average</td>
          <td><StatisticsLine value={calculateAverage().toFixed(2)} /></td>
        </tr>
        <tr>
          <td>Positive</td>
          <td><StatisticsLine value={`${calculatePositive().toFixed(2)}%`} /></td>
        </tr>
      </tbody>
    </table>
  );
};

const StatisticsLine = ({text, value}) => <p>{text}: {value}</p>


export default App