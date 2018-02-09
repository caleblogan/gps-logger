import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api'

export const actionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  LOGIN_FETCH: 'LOGIN_FETCH',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT_FETCH: 'LOGOUT_FETCH',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR'
}

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    token: token
  }
}

export function login(username, password) {
  return (dispatch, getState) => {
    dispatch({type: actionTypes.LOGIN_FETCH})
    return axios.post(`${API_BASE_URL}/auth/login/`, {
      username: username,
      password: password
    })
      .then(response => {
        const token = response.data.key
        dispatch(setToken(token))
        dispatch({type: actionTypes.LOGIN_SUCCESS})
      })
      .catch(error => {
        console.log(error)
        dispatch({type: actionTypes.LOGIN_ERROR})
      })
  }
}

export function logout() {
  return (dispatch, getState) => {
    const {token} = getState()
    const headers = {
      'Authorization': `Token ${token}`
    }
    dispatch({type: actionTypes.LOGOUT_FETCH})
    return axios.post(`${API_BASE_URL}/auth/logout/`, {}, {headers})
      .then(response => {
        console.log('logged out successfully')
        console.log(response)
        dispatch({type: actionTypes.LOGOUT_SUCCESS})
      })
      .catch(error => {
        console.log('error logging out:', error)
        dispatch({type: actionTypes.LOGOUT_ERROR})
      })
  }
}