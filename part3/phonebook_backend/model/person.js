require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch(e => console.log('error connecting to MongoDB:', e.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (_, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
    },
})

module.exports = mongoose.model('Person', personSchema)