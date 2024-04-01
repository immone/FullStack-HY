import { useState, useEffect } from 'react'
import axios from 'axios'

const FetchWeather = ({time, temp, wind}) => {  
return(  
  <>
  <d>
  Time: {time}
  </d>
  <d>
    Weather:
    {temp}
  </d>
  <d>
    Wind:
    {wind}
  </d>
  </>
)
}

const CountryForm = ({handleInputChange, countries, setCountries}) => {
  return(
    <form onSubmit={setCountries}>
    <div>
        <input 
          value={countries}
          onChange={handleInputChange}
        />
    </div>
  </form>
  )
}

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}> {'show'} </button>
  )
}

const FormatCountry = ( {country, weather}) => {
  return(
    <>
    <h2> {country.name.common}</h2>
    <div>
      capital: {country.capital}
    </div>
    <div>
      area: {country.area}
    </div>
    <br>
    </br>
    <div>
      <b>languages:</b>
      {Object.values(country.languages).map(c =>
          <div key={c}>
            {c}
          </div>
          )}
    </div>
    <div>
    <br>
    </br>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
    <h2>Weather in {country.capital}</h2>
    {weather}
    </>
  )
}

const ListCountries = ({countryList, fnc, setWeather, currentWeather}) => {
  const n = countryList.length
  if (n > 10) {
    return(
      "Too many matches, specify another filter"
    )
  }
  else if (n === 1) {
    setWeather(countryList[0].latlng[0], countryList[0].latlng[1])
    return (
      <>
      <FormatCountry country = {countryList[0]} weather={setWeather}/>
      <FetchWeather 
        time={currentWeather.current.time}
        temp={currentWeather.current.temperature_2m}
        wind={currentWeather.wind_speed_10m}/>
      </>
    )
  }
  return(
    <>
    {countryList.map(c => 
      <div key={c.ccn3}>
        {c.name.common}
        <Button handleClick={() => fnc(c)}/>
      </div >
    )}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState('')
  const [currentCountries, setCurrentCountries] = useState([])
  const [currentWeather, setCurrentWeather] = useState([])

  useEffect(() => {
      console.log('effect run, country now', countries)
      if (countries) {
        console.log('fetching countries..')
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(response => {
            setCurrentCountries(response.data)
          })
      }
    }, [countries])

  const handleInputChange = (event) => {
    setCountries(event.target.value)
  } 

  const setWeather = (lat, long) => {
      axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
      .then(response =>
        setCurrentWeather(response.data))
  }

  const filterCountries = () => {
    const val = countries.toLowerCase()
    const temp = currentCountries.map(x=>x.name.common.toLowerCase())
    return (
      currentCountries.filter(x => 
        x.name.common.toLowerCase().includes(val))
    )
  }

  const fillInput = (country) => {
    setCurrentCountries([country])
  }

  const fetchData = () => {
    return null
  }

  return (
    <div>
      find countries
    <CountryForm
      setCountries={fetchData}
      countries={countries} 
      handleInputChange={handleInputChange}
    />
    <ListCountries 
      countryList={filterCountries()} 
      fnc={fillInput} 
      setWeather={setWeather}
      currentWeather={currentWeather}
    />
    </div>
  )
}

export default App