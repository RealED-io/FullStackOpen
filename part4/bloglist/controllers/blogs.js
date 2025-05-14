const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).end()
    }
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || blog.title === '' || !blog.url || blog.url === '') {
        response.status(400).end()
    }
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    response.status(200).json(blog)
})

module.exports = blogsRouter