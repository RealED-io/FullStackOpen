const CountryInfo = ({ country, countriesData }) => {
  if (!country) {
    return 
  }

  const countryData = countriesData.find(c => c.name.common === country)

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <p>Capital {countryData.capital}</p>
      <p>Area {countryData.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt} />
    </div>
  )
}

  export default CountryInfo