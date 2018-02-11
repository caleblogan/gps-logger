import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api'

export default class ApiClient {

  constructor() {
    this.token = null
    this.api = axios.create({
      baseURL: API_BASE_URL,
    })
  }

  /**
   * Only checks to see if the token is null or not
   * @returns {boolean} true if token is not null otherwise false
   */
  isAuthed() {
    return !!this.token
  }

  /**
   * Sets the token and the Authorization header
   * @param token
   */
  auth(token) {
    this.token = token
    this.api.defaults.headers.common['Authorization'] = `Token ${token}`
  }

  /**
   * Creates an axios instance without auth
   * for instance, login will f
   * @returns {AxiosInstance}
   */
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

  getUser()  {
    return this.api.get('/auth/user/')
  }

  getLogs() {
    return this.api.get('/logs/')
  }

  addLog(name) {
    return this.api.post(
      '/logs/',
      {
        name
      }
    )
  }

  addPosition(id, position) {
    return this.api.post(
      `logs/${id}/positions/`,
      {
        ...position
      }
    )
  }

  getAllPositions() {
    return this.api.get('/positions/')
  }

}
