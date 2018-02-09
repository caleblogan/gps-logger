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
  return (dispatch, getState, api) => {
    dispatch({type: actionTypes.LOGIN_FETCH})
    return api().login(username, password)
      .then(response => {
        const token = response.data.key
        console.log(response.data)
        dispatch(setToken(token))
        dispatch({type: actionTypes.LOGIN_SUCCESS})
        // window.location = '/'
        return Promise.resolve()
      })
      .catch(error => {
        dispatch({type: actionTypes.LOGIN_ERROR})
        return Promise.reject(error)
      })
  }
}

export function logout() {
  return (dispatch, getState, api) => {
    const {token} = getState()
    dispatch({type: actionTypes.LOGOUT_FETCH})
    return api(token).logout()
      .then(response => {
        dispatch(setToken(null))
        dispatch({type: actionTypes.LOGOUT_SUCCESS})
      })
      .catch(error => {
        dispatch({type: actionTypes.LOGOUT_ERROR})
      })
  }
}