require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toObject', {
    transform: (_, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
    },
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({})
        .then(res => {
            console.log('phonebook:')
            res.forEach(p => {
                console.log(p)
                // console.log(p.name, p.number)
            })
            mongoose.connection.close()
        })
} else if (process.argv.length < 5) {
    console.log('give name & number as argument')
    process.exit(1)
} else {
    const p = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    p.save()
        .then(res => {
            console.log(`added ${res.name} number ${res.number} to phonebook`)
            mongoose.connection.close()
        })
}