import { render } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, vi, describe, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let blog
  let mockHandleLike
  let mockIsUserCreated
  let mockHandleRemove
  let container

  beforeEach(() => {
    blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://example.com',
      likes: 0,
      user: {
        name: 'Test user'
      }
    }

    // Mock functions for the Blog component
    mockHandleLike = vi.fn()
    mockIsUserCreated = vi.fn()
    mockHandleRemove = vi.fn()

    container = render(
      <Blog
        blog={blog}
        likeBlog={mockHandleLike}
        isUserCreated={mockIsUserCreated}
        removeBlog={mockHandleRemove}
      />
    ).container
  })

  test('The default view of the blog component is displayed', () => {
    const defaultDiv = container.querySelector('.defaultBlog')
    expect(defaultDiv).not.toHaveStyle({ display: 'none' })

    const detailedDiv = container.querySelector('.detailedBlog')
    expect(detailedDiv).toHaveStyle({ display: 'none' })
  })

  test('The blog component displays the blogs title and author', () => {
    const defaultDiv = container.querySelector('.defaultBlog')
    expect(defaultDiv).toHaveTextContent('"Test blog" by Test author')
  })

  test('The blog component does not display its url or likes by default', () => {
    const defaultDiv = container.querySelector('.defaultBlog')
    expect(defaultDiv).not.toHaveTextContent('http://example.com')
    expect(defaultDiv).not.toHaveTextContent('likes: 0')
  })

  test('The detailed view of the blog component is displayed when the view button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.openDetailedView')
    await user.click(viewButton)

    const defaultDiv = container.querySelector('.defaultBlog')
    expect(defaultDiv).toHaveStyle({ display: 'none' })

    const detailedDiv = container.querySelector('.detailedBlog')
    expect(detailedDiv).not.toHaveStyle({ display: 'none' })

    expect(detailedDiv).toHaveTextContent('"Test blog" by Test author')
    expect(detailedDiv).toHaveTextContent('Url: http://example.com')
    expect(detailedDiv).toHaveTextContent('Likes: 0')
  })

  test('The like button calls the likeBlog function when clicked', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.openDetailedView')
    await user.click(viewButton)

    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(1)
  })

  test('The like button calls the likeBlog function twice when clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.openDetailedView')
    await user.click(viewButton)

    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
