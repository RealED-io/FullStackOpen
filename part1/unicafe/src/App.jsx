import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({label, value}) => {
  return(
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  
  // Case for no Feedback
  if (all === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  const average = (good - bad) / all
  const positive = good / all
  return(
    <table>
      <tbody>
        <StatisticLine label="good" value={good}/>
        <StatisticLine label="neutral" value={neutral}/>
        <StatisticLine label="bad" value={bad}/>
        <StatisticLine label="all" value={all}/>
        <StatisticLine label="average" value={average}/>
        <StatisticLine label="positive" value={positive * 100  + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="good" onClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App