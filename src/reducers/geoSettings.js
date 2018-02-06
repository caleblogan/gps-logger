import {actionTypes} from "../actions/geoLoggerActions";

const defaultGeoSettings = {
  isGeolocationEnabled: true,
  isGeolocationAvailable: true,
}

export default (state = defaultGeoSettings, action) => {
  switch (action.type) {
    case actionTypes.SET_GEOLOCATION_AVAILABLE:
      return {
        ...state,
        isGeolocationAvailable: action.isAvailable
      }
    case actionTypes.SET_GEOLOCATION_ENABLED:
      return {
        ...state,
        isGeolocationEnabled: action.isEnabled
      }
    default:
      return state
  }
}
