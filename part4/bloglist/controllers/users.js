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

usersRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        console.log(passwordHash)

        const user = new User({
            username,
            name,
            password: passwordHash
        })

        const savedUser = await user.save()

        console.log(savedUser)

        response.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter