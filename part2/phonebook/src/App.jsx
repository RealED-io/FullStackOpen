import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [filter, setFilter] = useState('')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddContact = (event) => {
    event.preventDefault()
    const findPerson = persons.find(p => p.name === newName)
    // Case if person is already at the contacts
    if(findPerson) {
      alert(`${findPerson.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }

  }

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPrompt onChange={(event) => setFilter(event.target.value)}/>
      <h2>add a new</h2>
      <form onSubmit={handleAddContact}>
        <p style={{margin: 0}}>name: <input value={newName} onChange={handleNewName}/></p>
        <p style={{margin: 0}}>number: <input value={newNumber} onChange={handleNewNumber}/></p>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={filteredPersons}/>
    </div>
  )
}

const Contacts = ({persons}) => 
  <div>
    {persons.map(person => <p key={person.name} style={{margin: 0}}>{person.name} {person.number}</p>)}
  </div>

const FilterPrompt = ({onChange}) => 
  <div>
    filter shown with <input onChange={onChange}></input>
  </div>


export default App