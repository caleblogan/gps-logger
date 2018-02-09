import {actionTypes} from '../actions/authActions';

export const token = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      console.log('setting token')
      return action.token
    default:
      return state;
  }
}

export default function auth (state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_FETCH:
      console.log('fetching')
      return state
    case actionTypes.LOGIN_SUCCESS:
      console.log('success')
      return state
    case actionTypes.LOGIN_ERROR:
      console.log('error')
      return state
    case actionTypes.LOGOUT_FETCH:
      console.log('fetching')
      return state
    case actionTypes.LOGOUT_SUCCESS:
      console.log('success')
      return state
    case actionTypes.LOGOUT_ERROR:
      console.log('error')
      return state
    default:
      return state;
  }
}