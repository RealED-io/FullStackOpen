const Contacts = ({persons, filter}) => {
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <div>
            {filteredPersons.map(person => 
            <p key={person.name} style={{margin: 0}}> {person.name} {person.number} </p>)}
        </div>
    )
}


export default Contacts