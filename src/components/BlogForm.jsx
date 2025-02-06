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
        <input
          data-testid="title"
          type="text"
          value={title}
          onChange={({ target }) => {setTitle(target.value)}}
          placeholder='Homecooking'
        />
      </div>
      <div>
        author
        <input
          data-testid="author"
          type="text"
          value={author}
          onChange={({ target }) => {setAuthor(target.value)}}
          placeholder='John Smith'
        />
      </div>
      <div>
        url
        <input
          data-testid="url"
          type="text"
          value={url}
          onChange={({ target }) => {setUrl(target.value)}}
          placeholder='http://homecooking.com'
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm