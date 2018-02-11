import {actionTypes} from '../actions/userActions'

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_FETCH:
      return state
    case actionTypes.LOAD_USER_SUCCESS:
      return {...action.user}
    default:
      return state
  }
}
