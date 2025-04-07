const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

morgan.token('body', req => req.method === 'POST' ? JSON.stringify(req.body) : null)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const qty = persons.length
    res.send(
        `<p>Phonebook has info for ${qty} people </p>
        <p>${new Date()}</p>`
    )
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person || !person.name || !person.number) {
        res.status(400).json({
            error: 'content missing'
        })
        return
    }

    if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        res.status(400).json({
            error: `${person.name} already exist`
        })
        return
    }

    const id = Math.floor(Math.random() * 1_000_000).toString()
    person.id = id
    persons.push(person)
    res.json(persons.find(p => p.id === id))
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    const person = persons.find(p => p.id === id)
    person.name = body.name
    person.number = body.number
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})