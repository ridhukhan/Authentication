import axios from "axios"

const server ="http://localhost:3000"
const api = axios.create({
    baseURL:,
    withCredentials:true,
})