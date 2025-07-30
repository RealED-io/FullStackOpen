import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import NewBlogForm from './components/NewBlogForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (window.localStorage.user) {
      setUser(JSON.parse(window.localStorage.user))
    }
  }, [])

  async function fetchBlogs() {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleAddBlog = (blog) => {
    if (blog.title.length > 0 && blog.author.length > 0 && blog.url.length > 0) {
      setBlogs(blogs.concat(blog))
    }
  }

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
        await blogService.remove(blog.id, user.token)
        await fetchBlogs()
        handleNotification(`"${blog.name}" by "${blog.author}" removed`)
      }
    } catch (error) {
      console.log(error)
      handleNotification(`Removing "${blog.name}" by "${blog.author}" failed.`)
    }
  }

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleLike = (id) => {
    blogService.like(id)
  }
  return (
    <>
      <h2>blogs</h2>
      {notification ? <p>{notification}</p> : null}
      {user ?
        <>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='Create New Blog'>
            <NewBlogForm token={user.token} onCreate={handleAddBlog} onNotification={handleNotification} />
          </Togglable>
        </> :
        <Togglable buttonLabel="Login">
          <LoginForm onLogin={handleLogin} onNotification={handleNotification} />
        </Togglable>
      }
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={user?.username} handleLike={handleLike} handleRemove={() => handleRemove(blog)}/>
      )}
    </>
  )
}

export default App