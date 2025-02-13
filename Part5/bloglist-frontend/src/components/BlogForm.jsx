import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createNewBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>Title: <input type='text' value={title} name='Title' onChange={(event) => setTitle(event.target.value)} /></div>
        <div>Author: <input type='text' value={author} name='Author' onChange={(event) => setAuthor(event.target.value)} /></div>
        <div>URL: <input type='text' value={url} name='Url' onChange={(event) => setUrl(event.target.value)} /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
