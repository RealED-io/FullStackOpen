import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (window.localStorage.user) {
      setUser(JSON.parse(window.localStorage.user))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div>
      {!user ?
        <LoginForm onLogin={handleLogin} /> :
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}
        </>
      }

    </div>
  )
}

export default App