import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    loginUser({ username, password })
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input type='text' value={username} name='Username' onChange={(event) => setUsername(event.target.value)} /></div>
        <div>Password: <input type='password' value={password} name='Password' onChange={(event) => setPassword(event.target.value)} /></div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
