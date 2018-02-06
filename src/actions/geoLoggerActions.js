export const actionTypes = {
  SET_ACTIVE_LOG: 'SET_ACTIVE_LOG',
  SET_GEOLOCATION_AVAILABLE: 'SET_GEOLOCATION_AVAILABLE',
  SET_GEOLOCATION_ENABLED: 'SET_GEOLOCATION_ENABLED',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
}

export function setActiveLog(logID) {
  return {
    type: actionTypes.SET_ACTIVE_LOG,
    id: logID
  }
}

export function setGeolocationAvailable(isAvailable) {
  return {
    type: actionTypes.SET_GEOLOCATION_AVAILABLE,
    isAvailable
  }
}

export function setGeolocationEnabled(isEnabled) {
  return {
    type: actionTypes.SET_GEOLOCATION_ENABLED,
    isEnabled
  }
}

export function setCurrentLocation(coords) {
  return {
    type: actionTypes.SET_CURRENT_LOCATION,
    coords
  }
}
