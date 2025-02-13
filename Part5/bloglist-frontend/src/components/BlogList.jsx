import Blog from './Blog'

const BlogList = ({ blogs, likeBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
    </div>
  )
}

export default BlogList
