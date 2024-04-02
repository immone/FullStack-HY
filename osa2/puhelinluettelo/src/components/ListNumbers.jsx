import Name from './Name'
import Button from './Button'

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

export default ListNumbers