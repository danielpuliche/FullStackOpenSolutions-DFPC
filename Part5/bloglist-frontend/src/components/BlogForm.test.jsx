import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, test, vi, describe, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  let mockCreateNewBlog
  let container

  beforeEach(() => {
    mockCreateNewBlog = vi.fn()

    container = render(<BlogForm createNewBlog={mockCreateNewBlog} />).container
  })

  test('The blog form is rendered correctly', () => {
    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const createButton = container.querySelector('.createButton')

    expect(titleInput).toBeInTheDocument()
    expect(authorInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
  })

  test('The blog form calls the createNewBlog function with the correct parameters', async () => {
    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const createButton = container.querySelector('.createButton')

    await userEvent.type(titleInput, 'Test title')
    await userEvent.type(authorInput, 'Test author')
    await userEvent.type(urlInput, 'http://example.com')
    await userEvent.click(createButton)

    expect(mockCreateNewBlog.mock.calls).toHaveLength(1)
    expect(mockCreateNewBlog).toHaveBeenCalledWith({
      title: 'Test title',
      author: 'Test author',
      url: 'http://example.com'
    })
  })

  test('The blog form is cleared after creating a new blog', async () => {
    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const createButton = container.querySelector('.createButton')

    await userEvent.type(titleInput, 'Test title')
    await userEvent.type(authorInput, 'Test author')
    await userEvent.type(urlInput, 'http://example.com')
    await userEvent.click(createButton)

    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
  })
})
