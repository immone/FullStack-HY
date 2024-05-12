import { useDispatch } from 'react-redux'
import { setNotification }  from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer' 

const AnecdoteForm = () => {
    const dispatch = useDispatch()
        
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added ${content}`, 5000))
    }


    return (
        <>
            <h2>create new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/> 
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm