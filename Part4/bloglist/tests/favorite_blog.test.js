const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./test_helper')

describe('favorite blog', () => {
  test('of one blog is the same blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0], 'The objects are not the same')
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expectedFavorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    assert.deepStrictEqual(result, expectedFavorite)
  })

  test('of an empty list', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
})
