import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

test('<NewBlog /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<NewBlog createBlog={createBlog} />)

  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const inputTitle = screen.getByPlaceholderText('title')

  const sendButton = screen.getByText('create')

  await user.type(inputAuthor, 'testauthor')
  await user.type(inputUrl, 'testurl')
  await user.type(inputTitle, 'testtitle')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testtitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testauthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testurl')

})