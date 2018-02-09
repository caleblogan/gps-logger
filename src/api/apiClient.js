import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api'

// export default function apiClient(store) {
//   console.log('store:', store)
//   return {
//     login: login
//   }
// }

export default function apiClient(token) {

  const headers = token ? {
      'Authorization': `Token ${token}`
    } : {}
  const instance = axios.create({
    headers: headers,
    baseURL: API_BASE_URL,
  })
  return {
    login: login(instance),
    logout: logout(instance),
    getLogs: getLogs(instance),
  }
}

const login = api => (username, password) => {
  return api.post(`/auth/login/`, {
      username: username,
      password: password
    })
}

const logout = api => () => {
  return api.post(`/auth/logout/`)
}

const getLogs = api => () => {
  console.log('logs:', api)
  return api.get('/logs/')
}