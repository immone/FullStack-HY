import { useState } from 'react'

const FilterNames = ({filterNames, newFilterName, handleFilterNameChange}) => {
  return(
    <form onSubmit={filterNames}>
    <div>
        filter shown with: 
        <input 
          value={newFilterName}
          onChange={handleFilterNameChange}
        />
    </div>
  </form>
  )
}

const PersonForm = ({addName, handleNameChange, newName, newNumber, handleNumberChange}) => {
  return(
    <>
    <h2>add a new</h2>
    <form onSubmit={addName}>
      <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        <div>
          number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const Name = ({name, number}) => <>{name} {number}</>

const ListNumbers = ({persons}) => {
  if (typeof persons === 'undefined') return 
  else {
    return(
    <>
    <h2>Numbers</h2>
    {persons.map(p => 
      <div key={p.name} >
        <Name name={p.name} number={p.number} />
      </div >
    )}
    </>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)
  } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const filterNames = () => {
    const val = newFilterName.toLowerCase()
    return (
      persons.filter(x => x.name.toLowerCase().includes(val))
    )
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(x => x.name).includes(newName)) {
      alert(`${newName} already exists in the phonebook`);
    }
    else {
      if (newNumber === '') {
        alert(`Insert a number`);
      }
      else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    }
  }

return (
  <div>
    <h2>Phonebook</h2>
    <FilterNames 
      filterNames={filterNames} 
      newFilterName={newFilterName} 
      handleFilterNameChange={handleFilterNameChange}
    />
    <PersonForm 
      addName={addName} 
      handleNameChange={handleNameChange}
      newName={newName}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
    />
    <ListNumbers persons={filterNames()}> </ListNumbers>
  </div>
)

}

export default App  