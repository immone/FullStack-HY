import { useState } from 'react'
import Button from './button'

const Blog = ({ blog, addLike, removeBlog, currentUser }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  // This is adhoc implementation, since there is currently no way to obtain the id of an user
  // in front and I'm not sure what is a go-to implementation for that

  const showIfUser = { display: currentUser.username === blog.user['username'] && currentUser.name === blog.user['name'] ? '' : 'none' }

  const blogWithLike = {
    user: blog.user['id'],
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id, blog)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setInfoVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className="togglableButton">
        <ul>
          <li>{blog.title} {blog.author}</li>
          <li>{blog.url}</li>
          <li> likes: {blog.likes} <Button handleClick={() => addLike(blogWithLike, blog.id)} text={'like'}/> </li>
          <li>{blog.user['name']}</li>
        </ul>
        <div style={showIfUser}>
          <Button handleClick={() => deleteBlog()} text={'remove'}/>
        </div>
        <button onClick={() => setInfoVisible(false)}>hide</button>
      </div>
    </div>
  )
}

export default Blog