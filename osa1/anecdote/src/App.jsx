import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Display = (props) => <h1> {props.text} </h1>

const ShowAnecdote = ({anecdotes, selected}) => {
  return(
    <p>
      {anecdotes[selected]}
    </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const n = anecdotes.length

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(n).fill(0))

  const setIndex = () => setSelected(() => Math.floor(Math.random() * n))
  
  // https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
  const FindIndex = () => votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)

  const addVote = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
  }

  return (
    <div>
      <Display text="Anecdote of the day" />
      <ShowAnecdote anecdotes={anecdotes} selected={selected} />
      <p>
        {"has " + votes[selected] + " votes"}
      </p>
      <Button handleClick={addVote} text={"vote"} />
      <Button handleClick={setIndex} text={"next anecdote"} />
      <Display text="Anecdote with the most votes" />
      <ShowAnecdote anecdotes={anecdotes} selected={FindIndex(votes)} />
      <p>
        {"has " + votes[FindIndex(votes)] + " votes"}
      </p>
    </div>
  )
}

export default App