import axios from "axios";

const BASE_URL = (lat, lon) => 
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`

const get = (lat, lon) => 
    axios.get(BASE_URL(lat, lon))
    .then(Response => Response.data)

export default {
    get
}