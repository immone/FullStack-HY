import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      notificationChange(state, action) {
        return action.payload
      }
    }
  })

export const { notificationChange } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(notificationChange(''))
          }, time)
        dispatch(notificationChange(content))
    }
}

export default notificationSlice.reducer