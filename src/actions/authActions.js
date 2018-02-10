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
  return function _api(dispatch, getState, api) {
    return api.login(username, password)
      .then(response => {
        const token = response.data.key
        dispatch(setToken(token))
        return Promise.resolve()
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export function logout() {
  return function _api(dispatch, getState, api) {
    api.logout()
      .then(response => {
        dispatch(setToken(null))
      })
      .catch(error => {
        console.log('err', error)
      })
  }
}
