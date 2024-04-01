import { useEffect, useState } from 'react'
import nameService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

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

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}> {'delete'} </button>
  )
}

const ListNumbers = ({persons, fnc}) => {
  // pass confirmation from App to be able to affect state arrays
  if (typeof persons === 'undefined') return
  else {
    return(
    <>
    <h2>Numbers</h2>
    {persons.map(p => 
      <div key={p.name} >
        <Name name={p.name} number={p.number} />
        <Button handleClick = {() => fnc(p)} person={p}></Button>
      </div >
    )}
    </>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const displayMessage = (msg) => {
    setErrorMessage(msg)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }

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

  const confirmation = (p) => {
    if (confirm(`Are you sure you want to delete ${p.name}?`)) {
      nameService.remove(p.id)
      const temp = persons.filter(x => x.name !== p.name) // To avoid mutating state array
      setPersons(temp)
      displayMessage(`Deleted ${p.name}`)
    }
  }

  const addName = (event) => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    if (persons.map(x => x.name).includes(newName)) {
      if (confirm(`${newName} already exists in the phonebook. Replace old number?`)) {
        const temp = persons.filter(x => x.name !== newPerson.name) // To avoid mutating state array
        const id = persons.find(x => x.name === newPerson.name).id
        nameService
          .update(id, newPerson)
          .then(response => {
            setPersons(temp.concat(response))
            setNewName('')
            setNewNumber('')
          })
          .catch(error =>
            displayMessage(`Information of ${newPerson.name} has already been removed from server`))
      }
    }
    else {
      if (newNumber === '') {
        displayMessage('Insert a phone number')
      }
      else {
        nameService
          .create(newPerson)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
          })
          displayMessage(`Added ${newPerson.name}`)
      }
    }
  }

  useEffect( () => {
    nameService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])

return (
  <div>
    <h2>Phonebook</h2>
    <Notification message ={errorMessage}/>
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
    <ListNumbers persons={filterNames()} fnc={confirmation} > </ListNumbers>
  </div>
)

}

export default App  