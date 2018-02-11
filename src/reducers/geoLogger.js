import {actionTypes as geoTypes} from "../actions/geoLoggerActions";
import {actionTypes as logTypes} from "../actions/logActions"

const defaultLogger = {
  activeLogID: 2,
  currentLocation: {},
  logsLoading: false,
}


export default (state = defaultLogger, action) => {
  switch (action.type) {
    case geoTypes.SET_ACTIVE_LOG:
      return {...state, activeLogID: action.id}
    case geoTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.coords
      }
    case logTypes.GET_LOGS_FETCH:
      return {
        ...state,
        logsLoading: true
      }
    case logTypes.GET_LOGS_SUCCESS:
      return {
        ...state,
        logsLoading: false
      }
    case logTypes.GET_LOGS_FAILURE:
      return {
        ...state,
        logsLoading: false
      }
    default:
      return state
  }
}
