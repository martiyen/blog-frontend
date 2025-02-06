import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNotification, setNewNotification] = useState(null)
  const [isSuccessful, setIsSuccessful] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    loggedUser ? setUser(JSON.parse(loggedUser)) : setUser(null)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setNewNotification(exception.response.data.error)
      setIsSuccessful(false)
      setTimeout(() => {
        setNewNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const newBlogSubmission = async newBlogObject => {

    try {
      blogService.setToken(user.token)
      console.log('created new blog:', newBlogObject)
      const createdBlog = await blogService.create(newBlogObject)
      console.log('saved blog in db:', createdBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setIsSuccessful(true)
      setTimeout(() => {
        setNewNotification(null)
      }, 5000)
    } catch(exception) {
      setNewNotification(exception.response.data.error)
      setIsSuccessful(false)
      setTimeout(() => {
        setNewNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.setToken(user.token)
        console.log(`deleting blog with id ${blog.id}`)
        const reponse = await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch(exception) {
        setNewNotification(exception.response.data.error)
        setIsSuccessful(false)
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to the application</h2>
        <div>
          username
          <input data-testid="username" type="text" value={username} onChange={({ target }) => {setUsername(target.value)}} />
        </div>
        <div>
          password
          <input data-testid="password" type="password" value={password} onChange={({ target }) => {setPassword(target.value)}} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    )
  }

  const addALike = async blog => {
    const requestBody = { likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update({ id: blog.id, updatedObject: requestBody })
      setBlogs(blogs
        .map(b => b.id === updatedBlog.id
          ? { ...b, likes: updatedBlog.likes }
          : b
        ))
    } catch(exception) {
      console.log(exception.response.data.error)
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification message={newNotification} isSuccessful={isSuccessful}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={newNotification} isSuccessful={isSuccessful}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        <Togglable showButtonLabel={'create new blog'} hideButtonLabel={'cancel'}>
          <BlogForm newBlogSubmission={newBlogSubmission} />
        </Togglable>
      </div>
      {sortedBlogs.map(blog =>
        <div key={blog.id}>
          <Blog blog={blog} addALike={addALike} removeBlog={deleteBlog} currentUser={user.username}/>
        </div>
      )}
    </div>
  )
}

export default App