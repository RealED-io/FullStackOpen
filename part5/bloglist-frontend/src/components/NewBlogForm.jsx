const NewBlogForm = ({ onCreate }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    onCreate(blog)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" type="text" />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" type="text" />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" type="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm