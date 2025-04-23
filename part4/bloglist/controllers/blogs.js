const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res) => {
    const blog = await Blog.find({})
    res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
})

module.exports = blogsRouter