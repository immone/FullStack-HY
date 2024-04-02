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

export default PersonForm