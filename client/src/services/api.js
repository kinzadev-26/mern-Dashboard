import axios from 'axios'

const API = axios.create({
  baseURL: 'https://mern-dashboard-coral.vercel.app' ,
})

export default API