const Contacts = ({persons, filter, deletePerson}) => {
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    return(
        <div>
            {filteredPersons.map(person => 
            <p key={person.name} style={{margin: 0}}> 
                {person.name} {person.number} 
                <button onClick={() => deletePerson(person.id)}>delete</button>
                </p>)}
        </div>
    )
}


export default Contacts