import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // useEffect to fetch the blogs from the server
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // useEffect to get logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout handler
  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      setErrorMessage('Logout fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Create Blog handler
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log('Blog created')
    } catch (exception) {
      setErrorMessage('Error creating a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Login Form
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} /></div>
        <div>Password: <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} /></div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )

  // Create blog block
  const createBlog = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>Title: <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} /></div>
        <div>Author: <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>URL: <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

  // Blog List
  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged-in.</p>
      <button onClick={handleLogout}>Logout</button>
      {createBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {
        user === null
          ? loginForm()
          : blogList()
      }
    </div>
  )
}

export default App
