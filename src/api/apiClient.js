import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api'

export default class ApiClient {
  constructor() {
    this.token = null
    this.api = axios.create({
      baseURL: API_BASE_URL,
    })
  }

  isAuthed() {
    return !!this.token
  }

  auth(token) {
    this.token = token
    this.api.defaults.headers.common['Authorization'] = `Token ${token}`
  }

  noauth() {
    return axios.create({baseURL: API_BASE_URL, headers: {'Authorization': null}})
  }

  login(username, password) {
    return this.noauth().post(`/auth/login/`, {
      username: username,
      password: password
    })
  }

  logout() {
    return this.api.post(`/auth/logout/`)
      .then((response) => {
        this.token = null
        return Promise.resolve(response)
      })
  }

  getLogs() {
    return this.api.get('/logs/')
  }
}
