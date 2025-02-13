import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        "{blog.title}" by {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        "{blog.title}" by {blog.author} <button onClick={toggleVisibility}>Hide</button><br />
        Url: {blog.url}<br />
        likes: {blog.likes} <button>Like</button><br />
        Added by: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
