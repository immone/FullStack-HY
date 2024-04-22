import { useEffect, useState } from 'react'

const CreateNewForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const handleAddNew = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddNew}>
        <div>
            title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
            data-testid='title'
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
            data-testid='author'
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
            data-testid='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNewForm