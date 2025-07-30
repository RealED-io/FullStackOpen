import { useState } from 'react'
import BlogService from '../services/blogs'

const Blog = ({ blog, username, handleRemove }) => {
  const [visibility, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = () => {
    setVisibility(visibility => !visibility)
  }

  const handleLike = (id) => {
    BlogService.like(id)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle} className='blog'>
      <p>
        {blog.title} {blog.author} <button onClick={handleVisibility}>{visibility ? 'hide' : 'show'}</button>
      </p>
      {visibility &&
        <>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
          <p>{blog.user?.name ?? 'Anonymous'}</p>
          {username && username === blog.user?.username &&
          <button onClick={handleRemove}>remove</button>}
        </>
      }
    </div>
  )
}


export default Blog