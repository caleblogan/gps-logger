import * as utils from "../lib/utils";
import {apiCall} from "../api/apiClient";

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
  utils.storagePut('token', token)
  return {
    type: actionTypes.SET_TOKEN,
    token: token
  }
}

export function login(username, password) {
  return apiCall((dispatch, getState, api) => {
    return api.login(username, password)
      .then(response => {
        const token = response.data.key
        dispatch(setToken(token))
        return Promise.resolve()
      })
      .catch(error => {
        return Promise.reject(error)
      })
  })
}

export function logout() {
  return apiCall((dispatch, getState, api) => {
    api.logout()
      .then(response => {
        dispatch(setToken(null))
      })
      .catch(error => {
        console.log('err', error)
      })
  })
}
