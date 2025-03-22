import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import FilterPrompt from './components/FilterPrompt'
import ContactForm from './components/ContactForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
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