import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {
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
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
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