const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const blogHelper = require('./test_helper')

const api = supertest(app)

describe('Api blog with initial blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = blogHelper.blogs
      .map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

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

  describe('Add new blogs', () => {
    test('create a new blog correctly', async () => {
      const newBlog = {
        title: blogHelper.listWithOneBlog[0].title,
        author: blogHelper.listWithOneBlog[0].author,
        url: blogHelper.listWithOneBlog[0].url,
        likes: blogHelper.listWithOneBlog[0].likes
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogHelper.blogs.length + 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      assert(titles.includes(newBlog.title))

      const url = blogsAtEnd.map((blog) => blog.url)
      assert(url.includes(newBlog.url))
    })

    test('set the likes to zero when missing the likes property', async () => {
      const newBlog = {
        title: blogHelper.listWithOneBlog[0].title,
        author: blogHelper.listWithOneBlog[0].author,
        url: blogHelper.listWithOneBlog[0].url
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogHelper.blogsInDb()
      const likesByTitle = blogsAtEnd.reduce((dictTitles, blog) => {
        dictTitles[blog.title] = blog.likes
        return dictTitles
      }, {})

      assert.strictEqual(likesByTitle[newBlog.title], 0)
    })

    test('missing title and url return an 400', async () => {
      const newBlog = {
        author: blogHelper.listWithOneBlog[0].author
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('Correct properties name', () => {
    test('unique identifier is id, not _id', async () => {
      const blogs = await blogHelper.blogsInDb()
      blogs.forEach((blog) => {
        assert.notStrictEqual(blog.id, undefined)
        assert.strictEqual(blog._id, undefined)
      })
    })
  })

  describe('delete a single post', () => {
    test('an existing one is deleted correctly', async () => {
      const blogsAtStart = await blogHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const identifiers = blogsAtEnd.map((b) => b.id)
      assert(!identifiers.includes(blogToDelete.id))
    })

    test('a invalid id return 400', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      const blogsAtStart = await blogHelper.blogsInDb()

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('an non existing one return 204 but not remove anything', async () => {
      const blogsAtStart = await blogHelper.blogsInDb()
      const nonExistingId = await blogHelper.nonExistingId()

      await api
        .delete(`/api/blogs/${nonExistingId}`)
        .expect(204)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  describe('update a blog information', () => {
    test('update a blog with valid info', async () => {
      const blogsAtStart = await blogHelper.blogsInDb()
      const blogBeforeUpdate = blogsAtStart[0]

      const blogToUpdate = {
        ...blogBeforeUpdate,
        title: 'New Title',
        author: 'New Author',
        url: 'New url',
        likes: blogBeforeUpdate.likes + 1
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

      const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogBeforeUpdate.id)
      assert.deepStrictEqual(updatedBlog, blogToUpdate)
      assert.strictEqual(updatedBlog.likes, blogBeforeUpdate.likes + 1)
    })

    test('update a blog with invalid info dont update and return 400', async () => {
      const blogsAtStart = await blogHelper.blogsInDb()
      const blogBeforeUpdate = blogsAtStart[0]

      const blogToUpdate = {
        id: blogBeforeUpdate.id,
        likes: 'No Valid, just numbers!'
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)

      const blogsAtEnd = await blogHelper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

      const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogBeforeUpdate.id)
      assert.deepStrictEqual(updatedBlog, blogBeforeUpdate)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
