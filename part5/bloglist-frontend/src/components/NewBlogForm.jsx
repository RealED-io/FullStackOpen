import blogService from '../services/blogs'

const NewBlogForm = ({token, onCreate, onNotification}) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        try {
            const response = await blogService.create({title, author, url}, token)
            onCreate(response)
            onNotification(`a new blog ${title} by ${author} added`)
        } catch (error) {
            console.log(error.message)
        }
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