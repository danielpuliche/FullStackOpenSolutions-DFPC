const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return null }
  return blogs.reduce((favoriteBlogObj, blog) => {
    return blog.likes > favoriteBlogObj.likes ? blog : favoriteBlogObj
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return null }

  const countByAuthor = _.countBy(blogs, 'author')
  const mostRepeatedAuthor = _.maxBy(Object.keys(countByAuthor), (author) => countByAuthor[author])

  return {
    author: mostRepeatedAuthor,
    blogs: countByAuthor[mostRepeatedAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
