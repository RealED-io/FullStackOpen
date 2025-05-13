const dummy = () => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((prev, { likes }) => prev + likes, 0)
}


const favoriteBlog = (blogs) => {
    return blogs.reduce((max, curr) => curr.likes > max.likes ? curr : max)
}


const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return
    }

    const filteredBlogs = []
    blogs.forEach(blog => {
        const existingBlog = filteredBlogs.find(b => b.author === blog.author)
        if (existingBlog) {
            existingBlog.blogs++
        } else {
            const newBlog = {
                author: blog.author,
                blogs: 1
            }
            filteredBlogs.push(newBlog)
        }
    })

    return filteredBlogs.reduce((max, curr) => curr.blogs > max.blogs ? curr : max)
}


const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return
    }

    const filteredBlogs = []
    blogs.forEach(blog => {
        const existingBlog = filteredBlogs.find(b => b.author === blog.author)
        if (existingBlog) {
            existingBlog.likes += blog.likes
        } else {
            const newBlog = {
                author: blog.author,
                likes: blog.likes
            }
            filteredBlogs.push(newBlog)
        }
    })

    return filteredBlogs.reduce((max, curr) => curr.likes > max.likes ? curr : max)
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}