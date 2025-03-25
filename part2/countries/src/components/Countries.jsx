const Countries = ({ countries, selectCountry }) => {
    if (countries.length === 1) {
      return
    }

    if (countries.length === 0) {
      return <p>No matches</p>
    }

    if (countries.length <= 10) {
      return(
        countries.map(c => <p key={c}>{c} <button value ={c} onClick={() => selectCountry(c)}>Show</button></p>) 
      )
    }
    
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  export default Countries