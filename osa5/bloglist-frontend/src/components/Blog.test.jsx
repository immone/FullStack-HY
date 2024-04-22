import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('renders content', () => {
    const blog = {
      title: 'Blog for testing',
      likes: 0,
      url: "http://blog-to-be-tested.com",
      user: {
          id: "testid123"
      }
    }

    const user = {
        username: "testuser"
    }
    
    render(<Blog blog={blog} currentUser={user} />)

    const element = screen.getAllByText('Blog for testing')
    expect(element).toBeDefined()
    
})

test('clicking causes extra info to come visible', async () => {
    const blog = {
      title: 'Blog for testing',
      likes: 13,
      url: "http://blog-to-be-tested.com",
      user: {
          name: "other_test_user",
          id: "testid123"
      }
    }

    const user = {
        username: "testuser"
    }

    const { container } = render(<Blog blog={blog} currentUser={user} />)

    const divBefore = container.querySelector('.togglableButton')
    expect(divBefore).toHaveStyle('display: none')
  
    const userE = userEvent.setup()
    const button = screen.getByText('view')
    await userE.click(button)
  
    const elementUrl = screen.getByText('http://blog-to-be-tested.com')
    const elementLikes = screen.getByText('likes: 13')
    const elementUser = screen.getByText('other_test_user')

    const divAfter = container.querySelector('.togglableButton')
    expect(divAfter).not.toHaveStyle('display: none')

    expect(elementUrl).toBeDefined()
    expect(elementLikes).toBeDefined()
    expect(elementUser).toBeDefined()
})

test('clicking like button registers', async () => {
    const blog = {
      title: 'Blog for testing',
      likes: 13,
      url: "http://blog-to-be-tested.com",
      user: {
          name: "other_test_user",
          id: "testid123"
      }
    }

    const user = {
        username: "testuser"
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} addLike={mockHandler} currentUser={user} />)

    const userSetup = userEvent.setup()
    const button = screen.getByText('like')
    await userSetup.click(button)
    await userSetup.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})