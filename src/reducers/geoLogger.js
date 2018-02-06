import {actionTypes} from "../actions/geoLoggerActions";

const defaultLogger = {
  activeLogID: 2,
  currentLocation: {},
}


export default (state = defaultLogger, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_LOG:
      return {...state, activeLogID: action.id}
    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.coords
      }
    default:
      return state
  }
}
