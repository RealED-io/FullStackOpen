const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
})

blogSchema.set('toJSON', {
    transform: (_, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
