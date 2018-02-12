import {apiCall} from "../api/apiClient";

export const actionTypes = {
  LOAD_USER_FETCH: 'LOAD_USER_FETCH',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
}

function setUser(user) {
  return {
    type: actionTypes.LOAD_USER_SUCCESS,
    user
  }
}

export function loadUser() {
  return apiCall((dispatch, getState, api) => {
    return api.getUser()
      .then(response => {
        const {
          username,
          email,
          first_name: firstName,
          last_name: lastName
        } = response.data
        dispatch(setUser({username, email, firstName, lastName}))
      })
      .catch(error => {
        console.log(error)
      })
  })
}
