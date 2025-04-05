const express = require('express')
const app = express()

app.use(express.json())

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


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const qty = persons.length
    response.send(
        `<p>Phonebook has info for ${qty} people </p>
        <p>${new Date()}</p>`
    )
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person || !person.name || !person.number) {
        response.status(400).json({
            error: 'content missing'
        })
        return
    }

    if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        response.status(400).json({
            error: `${person.name} already exist`
        })
        return
    }

    const id = Math.floor(Math.random() * 1_000_000).toString()
    person.id = id
    persons.push(person)
    response.json(persons.find(p => p.id === id))
    console.log(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})