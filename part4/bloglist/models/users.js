const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
})

userSchema.set('toJSON', {
    transform: (_, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
    }
})

module.exports = mongoose.model('User', userSchema)