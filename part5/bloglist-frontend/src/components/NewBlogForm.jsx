import { useState } from "react"

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onCreate({ title, author, url })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" type="text" placeholder="The Title" onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" type="text" placeholder="John Doe" onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" type="text" placeholder="www.books.com" onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button data-testid="createBtn" type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm