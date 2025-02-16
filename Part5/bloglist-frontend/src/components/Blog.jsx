import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, isUserCreated, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    isUserCreated: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const removeVisible = { display: isUserCreated(blog) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const giveLike = () => {
    likeBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const removeHandler = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        "{blog.title}" by {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        "{blog.title}" by {blog.author} <button onClick={toggleVisibility}>Hide</button><br />
        Url: {blog.url}<br />
        likes: {blog.likes} <button onClick={giveLike}>Like</button><br />
        Added by: {blog.user.name} <br />
        <button style={removeVisible} onClick={removeHandler}>Remove</button><br />
      </div>
    </div>
  )
}

export default Blog
