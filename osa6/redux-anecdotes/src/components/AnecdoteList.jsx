import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if ( state.filter == 'ALL' ) {
            return state.anecdotes
        }
        const value = state.filter
        return state.anecdotes.filter(x => x.content.toLowerCase().includes(value))
    })

    const voteDispatch = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
    }

    return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteDispatch(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList