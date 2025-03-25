import { useState, useEffect, useMemo } from "react"

import WeatherService from "./services/weather"
import CountryService from "./services/countries"

import Countries from "./components/Countries"
import CountryInfo from "./components/CountryInfo"
import Weather from "./components/Weather"

const App = () => {
  const [countriesData, setCountriesData] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weather, setWeather] = useState([])

  // Get country data from API
  useEffect(() => {
    CountryService.getAll()
      .then(data => setCountriesData(data))
  }, [])

  // Get weather from weather API every change in selected country 
  useEffect(() => {
    if(selectedCountry) {
      const countryData = countriesData.find(c => c.name.common === selectedCountry)
      const [lat, lon] = countryData.capitalInfo.latlng
      WeatherService.get(lat, lon)
      .then(w => setWeather(w))
    }
  }, [selectedCountry])

  // Get all countrynames once all the country data is fetched
  const countryNames = useMemo(() => {
    const countries = countriesData.map(c => c.name.common)
    setSearchResult(countries)
    return countries
  }, [countriesData])

  // Handle search; everytime the search string changes
  const handleSearch = (event) => {
    const search = event.target.value
    const filtered = countryNames.filter(c => c.toLowerCase().includes(search.toLowerCase()))
    if(filtered.length === 1) {
      selectCountry(filtered[0])
    } else {
      selectCountry(null)
      setWeather(null)
      setSearchResult(filtered)
    }
  }

  // Selects country used by button and single search result case
  const selectCountry = (country) => {
    if (selectedCountry !== country) {
      setSelectedCountry(country)
      setSearchResult([country])
    }
  }

  return (
    <div>
      <p>find countries<input onChange={handleSearch}></input></p>
      <Countries countries={searchResult} selectCountry={selectCountry} />
      <CountryInfo country={selectedCountry} countriesData={countriesData} />
      <Weather weather={weather}/>
    </div>
  )
}

export default App
