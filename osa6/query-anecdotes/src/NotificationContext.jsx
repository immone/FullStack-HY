import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "":
          return ""
      case 'error':
          return "too short anecdote, must have length 5 or more"
      default:
          return `anecdote '${action}' voted`
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notifictationAndDispatch = useContext(NotificationContext)
    return notifictationAndDispatch[0]
}
  
export const useNotificationDispatch = () => {
    const notifictationAndDispatch = useContext(NotificationContext)
    return notifictationAndDispatch[1]
}
  

export default NotificationContext