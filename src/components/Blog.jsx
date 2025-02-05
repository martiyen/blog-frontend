import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addALike, removeBlog, currentUser }) => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    marginTop: 10,
    paddingTop: 5,
    paddingLeft: 4,
    paddingBottom: 2
  }

  const toggleDetailsVisibility = () => {
    setVisibleDetails(!visibleDetails)
  }

  if (visibleDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsVisibility}>hide</button>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} <button onClick={() => addALike(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username === currentUser &&
          <button onClick={() => removeBlog(blog)}>remove</button>
        }
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleDetailsVisibility}>show</button>
    </div>
  )
}

export default Blog