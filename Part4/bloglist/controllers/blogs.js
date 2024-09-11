const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const returnedBlogs = await Blog.find({})
  response.json(returnedBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
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
