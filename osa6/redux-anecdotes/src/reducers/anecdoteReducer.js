import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes' 

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload.sort(
        (a, b) => {
          if (a.votes > b.votes) {
            return -1
          } else if (a.votes < b.votes) {
            return 1
          }
          return 0
    })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = anecdote => {
  const id = anecdote.id
  const changedAnecdote = { 
    ...anecdote, 
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    await anecdoteService.update(id, changedAnecdote)
    const allAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}

export default anecdoteSlice.reducer