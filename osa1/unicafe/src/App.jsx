import { useState } from 'react'

const Display = (props) => <h1> {props.text} </h1>

const StatisticLine = (props) => {
  return(
      <tbody>
        <tr>
          <td> {props.text}  </td>
          <td> {props.value} </td>
        </tr>
      </tbody>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Statistics = ( {allClicks, good, bad, neutral} ) => {
  if (allClicks.length> 0) {
    return(
      <table>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={allClicks.length}/>
          <StatisticLine text='average' value={ (allClicks.reduce((s, x) => s + x, 0)/allClicks.length).toFixed(3) }/>
          <StatisticLine text='positive' value={ (100*good/allClicks.length).toFixed(3) + "%" }/>
      </table>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const increaseGood = () => {
    console.log(good)
    const updatedValue = good + 1
    setAll(allClicks.concat(1))
    setGood(updatedValue)
  }

  const increaseNeutral = () => {
    const updatedValue = neutral + 1
    setAll(allClicks.concat(0))
    setNeutral(updatedValue)
  }

  const increaseBad = () => {
    const updatedValue = bad + 1
    console.log(updatedValue)
    setAll(allClicks.concat(-1))
    setBad(updatedValue)
  }


  return (
    <div>
      <Display text='give feedback'/>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Display text='statistics'/>
      <Statistics allClicks={allClicks} good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App