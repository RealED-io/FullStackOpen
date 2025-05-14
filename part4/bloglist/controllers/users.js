const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (e) {
        next(e)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        const user = await User.findById(id)
        if (!user) {
            return response.status(404).end()
        }
        response.json(user)
    } catch (e) {
        if (e.kind === 'ObjectId' && e.name === 'CastError') {
            return response.status(404).end()
        }
        next(e)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
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

        console.log(passwordHash)

        const user = new User({
            username,
            name,
            password: passwordHash
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter