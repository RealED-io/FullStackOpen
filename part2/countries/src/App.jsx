import axios from "axios"
import { useState, useEffect } from "react"

const App = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [countryNames, setCountryNames] = useState([])
  const [countriesData, setCountriesData] = useState([])

  const [countryInfo, setCountryInfo] = useState([])
  const [displayCountry, setDisplayCountry] = useState(false)

  useEffect(() => {
    const URL_COUNTRIES = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios.get(URL_COUNTRIES)
      .then(Response => Response.data)
      .then(data => setCountriesData(data))
  }, [])

  useEffect(() => {
    setCountryNames(countriesData.map(c => c.name.common))
  }, [countriesData])

  useEffect(() => {
    setSearchResult(countryNames.filter(c => c.toLowerCase().includes(search.toLowerCase())))
  }, [countryNames, search])

  useEffect(() => {
    if (searchResult.length === 1){
      setCountryInfo(countriesData.find(c => c.name.common === searchResult[0]))
      setDisplayCountry(true)
    } else {
      setDisplayCountry(false)
    }
  }, [searchResult, countriesData])

  const showCountry = (country) => {
    setCountryInfo(countriesData.find(c => c.name.common === country))
    setDisplayCountry(true)
  }

  return (
    <div>
      <p>
        find countries<input onChange={(e) => setSearch(e.target.value)}></input>
      </p>
      {displayCountry && <CountryInfo
        name={countryInfo.name.common}
        capital={countryInfo.capital}
        area={countryInfo.area}
        languages={Object.values(countryInfo.languages)}
        flagSrc={countryInfo.flags.png}
        flagAlt={countryInfo.flags.alt}
      />}
      {!displayCountry && <Countries countries={searchResult} onClick={showCountry} />}
    </div>
  )
}

const Countries = ({ countries, onClick }) => {
  if (countries.length === 1) {
    return(null)
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  
  return (
    countries.map(c => <p key={c}>{c} <button onClick={() => onClick(c)}>Show</button></p>)
  )
}

const CountryInfo = ({ name, capital, area, languages, flagSrc, flagAlt }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={flagSrc} alt={flagAlt} />
    </div>
  )
}

export default App
