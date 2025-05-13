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
        res.json(blog)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = new Blog(req.body)

        if (!blog.title || blog.title === "" || !blog.url || blog.url === "") {
            res.status(400).end()
        }
        const result = await blog.save()
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }

})

module.exports = blogsRouter