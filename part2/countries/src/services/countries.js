import axios from "axios";

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () =>
    axios.get(BASE_URL)
    .then(Response => Response.data)

export default {
    getAll
}