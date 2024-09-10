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

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return null }

  const groupedByAuthor = _.groupBy(blogs, 'author')
  const likesByAuthor = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))

  return _.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
