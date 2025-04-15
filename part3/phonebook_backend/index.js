const express = require('express')
const morgan = require('morgan')
const Person = require('./model/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', req => req.method === 'POST' ? JSON.stringify(req.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
.catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => person ? res.json(person) : res.status(404).end())
        .catch(err => next(err))
})

app.get('/info', (req, res, next) => {
    Person.countDocuments({}, { hint: "_id_"})
        .then(qty => res.send(
            `<p>Phonebook has info for ${qty} people </p>
            <p>${new Date()}</p>`
        )
        .catch(err => next(err))
    )
})

app.post('/api/persons', (req, res, next) => {
    const person = new Person(req.body)

    if (!person || !person.name || !person.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    Person.findOne({ name : person.name })
        .then(p => p ? 
            res.status(400).json({error: `${p.name} already exist`}) :
            person.save()
                .then(newPerson => res.json(newPerson))
                .catch(err => next(err))
            )
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const {name, number} = req.body
    
    Person.findById(id)
        .then(person => {
            if (!person) {
                return res.status(404).end()
            }
            person.name = name
            person.number = number

            person.save()
                .then(p => res.json(p))
                .catch(err => next(err))
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(res.status(204).end())
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }

    console.error(err)
    next(err)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})