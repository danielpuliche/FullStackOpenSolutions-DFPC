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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
