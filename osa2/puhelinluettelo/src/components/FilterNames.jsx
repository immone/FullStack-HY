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

export default FilterNames