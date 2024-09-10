const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const blogHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogHelper.blogs
    .map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('Api blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned blogs amount is correct', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, blogHelper.blogs.length)
  })

  test('unique identifier is id, not _id', async () => {
    const blogs = await blogHelper.blogsInDb()
    blogs.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.strictEqual(blog._id, undefined)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
