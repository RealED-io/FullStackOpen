import { useState } from 'react'
import Contacts from './components/Contacts'
import FilterPrompt from './components/FilterPrompt'
import ContactForm from './components/ContactForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [filter, setFilter] = useState('')

  const handleAddContact = (newName, newNumber) => {
    const findPerson = persons.find(p => p.name === newName)
    // Case if person is already at the contacts
    if(findPerson) {
      alert(`${findPerson.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPrompt onChange={(event) => setFilter(event.target.value)}/>
      <h2>add a new</h2>
      <ContactForm handleAddContact={handleAddContact}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={filter}/>
    </div>
  )
}

export default App