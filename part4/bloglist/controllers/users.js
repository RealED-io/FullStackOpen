const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id).populate('blogs')
    if (!user) {
        return response.status(404).end()
    }
    response.json(user)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (!username || !name || !password) {
        return response.status(400).end()
    }

    if (username.length < 3) {
        return response.status(400).json({ error: 'username must be at least 3 characters' })
    }

    if (password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password: passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return response.status(400).json({ error: 'username already exists' })
        }
        next(error)
    }
})

module.exports = usersRouter