import Blog from './Blog'

const BlogList = ({ blogs, likeBlog }) => (
  <div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
  </div>
)

export default BlogList
