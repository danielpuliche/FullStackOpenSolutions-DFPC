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

module.exports = blogsRouter
