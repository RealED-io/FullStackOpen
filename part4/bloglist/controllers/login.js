const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    if (!user || await bcrypt.compare(password, user.password)) {
        return response.status(401).json( { error: 'invalid username or password' } )
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).json({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter