import { useState, useEffect } from 'react'
import personService from './services/persons'
import Contacts from './components/Contacts'
import FilterPrompt from './components/FilterPrompt'
import ContactForm from './components/ContactForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notif, setNotif] = useState(null)
  const [notifColor, setNotifColor] = useState('')

  useEffect(() => {
    personService.getAll().then(p => setPersons(p))
    document.title = "FullStackOpen - Phonebook"
  }, [])

  const handleAddContact = (newName, newNumber) => {
    const findPerson = persons.find(p => p.name === newName)
    // Case if person is already at the contacts
    if (findPerson) {
      const confirm = window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        personService.update(findPerson.id, { name: newName, number: newNumber })
          .then(updated => {
            setPersons(persons.map(p => p.id === updated.id ? updated : p))
            notification(`${updated.name} number changed to ${updated.number}`, 'green')
          })
          .catch(() => {
            notification(`Information of ${newName} has already been removed from server`, 'red')
            // Refreshes the data
            personService.getAll().then(p => setPersons(p))
          })
      }
    }
    // Case if person is already at the contacts
    else {
      personService.create({ name: newName, number: newNumber })
        .then(p => {
          setPersons(persons.concat(p))
          notification(`Added ${newName}`, 'green')
        })
        .catch((err) => {
          // notification(`${newName} not added`, 'red')
          notification(err.response.data.error, 'red')
        })
    }
  }

  const notification = (message, color) => {
    setNotifColor(color)
    setNotif(message)
    setTimeout(() => {
      setNotif(null)
    }, 3000)
  }

  const handleDeleteContact = (id) => {
    const confirm = window.confirm(`Delete ${persons.find(p => p.id === id).name}`)
    if (confirm) {
      personService.remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} color={notifColor} />
      <FilterPrompt onChange={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Numbers</h2>
      <Contacts persons={persons} filter={filter} deletePerson={handleDeleteContact} />
    </div>
  )
}

export default App