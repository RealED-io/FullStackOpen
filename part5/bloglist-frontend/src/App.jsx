import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";
import NewBlogForm from "./components/NewBlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (window.localStorage.user) {
      setUser(JSON.parse(window.localStorage.user))
    }
  }, [])

  useEffect( () => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
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

  if (user) {
    return (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <NewBlogForm token={user.token} onCreate={handleAddBlog}/>
          <br/>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}
        </>

    )
  } else {
    return (
      <LoginForm onLogin={handleLogin} />
    )
  }
}

export default App