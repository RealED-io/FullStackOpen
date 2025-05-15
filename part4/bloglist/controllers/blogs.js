const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blog)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })
    if (!blog) {
        return response.status(404).end()
    }
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const token = await jwt.verify(request.token, process.env.SECRET)
    if (!token || !token.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(token.id)

    if (!user) {
        return response.status(404).json({ error: 'user not found' })
    }

    const blog = new Blog({ ...request.body, user: user.id })

    if (!blog.title || blog.title === '' || !blog.url || blog.url === '') {
        response.status(400).end()
    }
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = await jwt.verify(request.token, process.env.SECRET)
    if (!token || !token.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(token.id)

    if (!user) {
        return response.status(404).json({ error: 'user not found' })
    }

    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).end()
    }
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).end()
    }

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    response.status(200).json(blog)
})

module.exports = blogsRouter