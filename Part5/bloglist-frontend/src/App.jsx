import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

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
  const handleLogin = async (loginUser) => {
    try {
      const user = await loginService.login(loginUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  // Create Blog
  const createNewBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setMessageType('success')
      setNotificationMessage(`A new blog "${newBlog.title}" by "${newBlog.author}" added.`)
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
    <LoginForm loginUser={handleLogin} />
  )

  // Blog form
  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm createNewBlog={createNewBlog} />
    </Togglable>
  )

  // Blog List
  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged-in.</p>
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
      <BlogList blogs={blogs} />
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} msgType={messageType} />
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App
