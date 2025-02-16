import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, likeBlog, isUserCreated, removeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    isUserCreated: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
  }

  return (
    <div>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} isUserCreated={isUserCreated} removeBlog={removeBlog} />)}
    </div>
  )
}

export default BlogList
