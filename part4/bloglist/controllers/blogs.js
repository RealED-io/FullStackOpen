const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blog = await Blog.find({})
        res.json(blog)
    } catch (e) {
        next(e)
    }
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).end()
        }
        res.json(blog)
    } catch (e) {
        if (e.kind === 'ObjectId' && e.name === 'CastError') {
            return res.status(404).end()
        }
        next(e)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = new Blog(req.body)

        if (!blog.title || blog.title === '' || !blog.url || blog.url === '') {
            res.status(400).end()
        }
        const result = await blog.save()
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await Blog.findByIdAndDelete(id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(blog)
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter