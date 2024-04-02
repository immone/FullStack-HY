import { useEffect, useState } from 'react'
import nameService from './services/persons'
import Notification from './components/Notification'
import ListNumbers from './components/ListNumbers'
import FilterNames from './components/FilterNames'
import PersonForm from './components/PersonForm'

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)
  } 

  const filterNames = () => {
    console.log(persons)
    const value = newFilterName.toLowerCase()
    return (
      persons.filter(x => x.name.toLowerCase().includes(value))
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
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.map(x => x.name).includes(newName)) {
      if (confirm(`${newName} already exists in the phonebook. Replace old number?`)) {
        const id = persons.find(x => x.name === newPerson.name).id
        const temp = persons.filter(x => x.name !== newPerson.name) // To avoid mutating state array
        newPerson.id = id
        nameService
          .update(id, newPerson)
          .then(response => {
            setPersons(temp.concat(response))
            setNewName('')
            setNewNumber('')
          })
          .catch(error =>
            displayMessage(`Information of ${newPerson.name} has already been removed from server`))
          displayMessage(`Updated information of ${newPerson.name}`)
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