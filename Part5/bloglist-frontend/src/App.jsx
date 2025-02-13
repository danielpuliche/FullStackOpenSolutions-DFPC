import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  // =========================

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

  // ===============================

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
      setNotificationMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setNotificationMessage(null)
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
      setMessageType('error')
      setNotificationMessage('Logout fail')
      setTimeout(() => {
        setNotificationMessage(null)
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
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessageType('success')
      setNotificationMessage(`A new blog "${title}" by "${author}" added.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageType('error')
      setNotificationMessage('Error creating a new blog')
      setTimeout(() => {
        setNotificationMessage(null)
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

  // Blog List
  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged-in.</p>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm
          handleSubmit={handleCreateBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} msgType={messageType} />
      {
        user === null
          ? loginForm()
          : blogList()
      }
    </div>
  )
}

export default App
