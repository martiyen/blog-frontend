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

  const deleteBlog = async (id) => {
    try {
      blogService.setToken(user.token)
      console.log(`deleting blog with id ${id}`)
      const reponse = await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch(exception) {
        console.log(exception)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to the application</h2>
        <div>
          username 
          <input type="text" value={username} onChange={({ target }) => {setUsername(target.value)}} />
        </div>
        <div>
          password 
          <input type="password" value={password} onChange={({ target }) => {setPassword(target.value)}} />
        </div>
        <div>
        <button type="submit">login</button>
        </div>
      </form>
    )
  }

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
      {blogs.map(blog =>
      <div key={blog.id}>
        <Blog blog={blog} />
      </div>
      )}
    </div>
  )
}

export default App