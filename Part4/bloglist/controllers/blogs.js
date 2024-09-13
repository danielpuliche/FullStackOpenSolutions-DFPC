const middleware = require('../utils/middleware')

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const returnedBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(returnedBlogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user._id // User id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: 'Not valid user to delete this note' })
  } else {
    await User.findByIdAndUpdate(
      blogToDelete.user.toString(),
      {
        $pull: { blogs: blogToDelete._id }
      }
    )

    await Blog.findByIdAndDelete(blogToDelete._id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToUpdate,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
