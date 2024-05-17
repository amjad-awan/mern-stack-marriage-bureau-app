import axios from "axios"
const API=axios.create({
    baseURL:process.env.REACT_APP_BASE_URI,
    withCredentials: true,
})

export default API