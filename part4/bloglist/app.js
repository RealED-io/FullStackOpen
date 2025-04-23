const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connection to MongoDB:', err.message))

app.use(express.json())

// Routers
app.use('/api/blogs', blogsRouter)

module.exports = app