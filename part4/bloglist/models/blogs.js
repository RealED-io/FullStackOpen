const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

blogSchema.set('toJSON', {
    transform: (_, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
