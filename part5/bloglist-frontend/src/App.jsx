import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  console.log(user)

  return (
    <div>
      {!user ?
        <LoginForm onLogin={user => setUser(user)}/> :
        <>
          <h2>blogs</h2>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}
        </>
      }

    </div>
  )
}

export default App