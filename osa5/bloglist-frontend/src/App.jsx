import { useEffect, useState, useRef } from 'react'
import BlogForm from './components/BlogForm'
import NewBlog from './components/NewBlog'
import NewLogin from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Button from './components/Button'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const displayMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayMessage('Wrong username or password')
    }
  }

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(
        blogObject
      )
      displayMessage(`Added a new blog: ${blogObject.title} by ${blogObject.author}`)
    } catch (exception) {
      displayMessage(`Failed to add new blog: ${blogObject.title} by ${blogObject.author}`)
    }
  }

  const addLike = async (blogObject, id) => {
    try {
      await blogService.update(
        id, blogObject
      )
      displayMessage(`Added a like for: ${blogObject.title} by ${blogObject.author}`)
    } catch (exception) {
      displayMessage(`Failed to add a like for: ${blogObject.title} by ${blogObject.author}`)
    }
  }

  const removeBlog = async (id, blogObject) => {
    try {
      await blogService.remove(
        id
      )
      displayMessage(`Deleted: ${blogObject.title} by ${blogObject.author}`)
    } catch (exception) {
      displayMessage(`Failed to delete: ${blogObject.title} by ${blogObject.author}`)
    }
  }

  if (user === null) {
    return (
      
      <div>
        <Notification
        message ={errorMessage}
      />
        <NewLogin
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message ={errorMessage}
      />
      <p>
        {user.name} logged in
        <Button
          handleClick = { () => window.localStorage.removeItem('loggedBlogappUser') }
          text = 'logout'
        />
      </p>
      <Togglable buttonLabel="new blog">
        <NewBlog createBlog={createBlog}/>
      </Togglable>
      <BlogForm
        blogs={blogs}
        addLike={addLike}
        removeBlog={removeBlog}
        currentUser={user}
      />
    </div>
  )

}

export default App