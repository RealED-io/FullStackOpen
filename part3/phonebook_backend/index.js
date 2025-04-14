const express = require('express')
const morgan = require('morgan')
const Person = require('./model/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', req => req.method === 'POST' ? JSON.stringify(req.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(e => {
            console.log(e)
            res.status(500).end()
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => person ? res.json(person) : res.status(404).end())
        .catch(res.status(500).end())
})

app.get('/info', (req, res) => {
    Person.countDocuments({}, { hint: "_id_"})
        .then(qty => res.send(
            `<p>Phonebook has info for ${qty} people </p>
            <p>${new Date()}</p>`
        )
    )
})

app.post('/api/persons', (req, res) => {
    const person = new Person(req.body)

    if (!person || !person.name || !person.number) {
        res.status(400).json({
            error: 'content missing'
        })
        return
    }

    Person.findOne({ name : person.name })
        .then(p => p ? 
            res.status(400).json({error: `${p.name} already exist`}) :
            person.save()
                .then(p => res.json(p))
            )
    })

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const {name, number} = req.body
    
    Person.findByIdAndUpdate(id, {name, number})
        .then(p => res.json(p))
        .catch(() => res.status(500).end())
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(res.status(200).end())
        .catch(res.status(500).end())
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})