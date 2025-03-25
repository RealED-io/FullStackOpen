const Weather = ({weather}) => {

    if (!weather || weather.length === 0) {
        return
    }
    
    return(
        <div>
            <h2>Weather</h2>
            <p>Temperature {(Number(weather.main.temp) - 273.15).toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather