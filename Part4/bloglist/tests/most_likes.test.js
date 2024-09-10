const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./objects/blogLists')

describe('Most likes', () => {
  test('of a bigger list is calculated right', () => {
    assert.deepStrictEqual(
      listHelper.mostLikes(blogs),
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
  })

  test('of an empty list is null', () => {
    assert.deepStrictEqual(
      listHelper.mostLikes([]),
      null
    )
  })

  test('of a list with one object is the author and its likes', () => {
    assert.deepStrictEqual(
      listHelper.mostLikes(listWithOneBlog),
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
  })
})
