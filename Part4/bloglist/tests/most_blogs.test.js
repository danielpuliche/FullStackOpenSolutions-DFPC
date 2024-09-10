const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./test_helper')

describe('Most blogs', () => {
  test('of an empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('of one blog is the author with blogs 1', () => {
    assert.deepStrictEqual(
      listHelper.mostBlogs(listWithOneBlog),
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )
  })

  test('of a bigger list is calculated right', () => {
    assert.deepStrictEqual(
      listHelper.mostBlogs(blogs),
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})
