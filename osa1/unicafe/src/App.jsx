import { useState } from 'react'

const Display = (props) => <h1> {props.text} </h1>

const DisplayCount = (props) => <p> {props.text} {props.value} </p>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log(good)
    const updatedValue = good + 1
    setGood(updatedValue)
  }

  const increaseNeutral = () => {
    const updatedValue = neutral + 1
    setNeutral(updatedValue)
  }

  const increaseBad = () => {
    const updatedValue = bad + 1
    setBad(updatedValue)
  }

  return (
    <div>
      <Display text='give feedback'/>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Display text='statistics'/>
      <DisplayCount text='good' value={good}/>
      <DisplayCount text='neutral' value={neutral}/>
      <DisplayCount text='bad' value={bad}/>
    </div>
  )
}

export default App