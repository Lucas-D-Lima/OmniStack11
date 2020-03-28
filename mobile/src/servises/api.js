import axios from 'axios'

const api = axios.create({
  baseURL:'http://177.55.41.120:3333'
})

export default api