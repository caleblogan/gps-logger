export const actionTypes = {
  SET_ACTIVE_LOG: 'SET_ACTIVE_LOG',
  SET_GEOLOCATION_AVAILABLE: 'SET_GEOLOCATION_AVAILABLE',
  SET_GEOLOCATION_ENABLED: 'SET_GEOLOCATION_ENABLED',
  ADD_NEW_LOG: 'ADD_NEW_LOG',
  ADD_POSITION_TO_LOG: 'ADD_POSITION_TO_LOG',
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

let nextLogID = 3
export function addLog(name) {
  return {
    type: actionTypes.ADD_NEW_LOG,
    id: nextLogID++,
    name: name,
    coords: []
  }
}

export function addLogPosition(position, logID) {
  return {
    type: actionTypes.ADD_POSITION_TO_LOG,
    position,
    logID
  }
}

export function setCurrentLocation(coords) {
  return {
    type: actionTypes.SET_CURRENT_LOCATION,
    coords
  }
}
