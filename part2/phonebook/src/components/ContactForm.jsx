import { useState } from 'react'

const ContactForm = ({ handleAddContact }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    return (
        <form
            onSubmit={(Event) => {
                Event.preventDefault();
                handleAddContact(newName, newNumber)
            }}>
            <p style={{ margin: 0 }}>name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></p>
            <p style={{ margin: 0 }}>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></p>
            <button type="submit">add</button>
        </form>
    )
}

export default ContactForm