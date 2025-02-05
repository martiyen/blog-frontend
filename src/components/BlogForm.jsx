import { useState } from 'react'

const BlogForm = ({ newBlogSubmission }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = event => {
    event.preventDefault()

    newBlogSubmission({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={newBlog}>
      <h2>create new</h2>
      <div>
        title
        <input type="text" value={title} onChange={({ target }) => {setTitle(target.value)}} />
      </div>
      <div>
        author
        <input type="text" value={author} onChange={({ target }) => {setAuthor(target.value)}} />
      </div>
      <div>
        url
        <input type="text" value={url} onChange={({ target }) => {setUrl(target.value)}} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm