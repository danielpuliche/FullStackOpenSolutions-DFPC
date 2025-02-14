import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, isUserCreated, removeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} isUserCreated={isUserCreated} removeBlog={removeBlog} />)}
    </div>
  )
}

export default BlogList
