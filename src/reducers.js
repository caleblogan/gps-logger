import { combineReducers } from 'redux'

import {actionTypes} from './actions';

const defaultGeoSettings = {
  isGeolocationEnabled: true,
  isGeolocationAvailable: true,
}

const defaultLogger = {
  activeLogID: 2,
  currentLocation: {},
}

const defaultLogs = [
  {
    id: 0, name: 'log 0', coords: [
    {
      coords: {latitude: 51.507351, longitude: -0.127758},
    },
    {
      coords: {latitude: 52.507351, longitude: -0.147758},
    },
  ]
  },
  {
    id: 1, name: 'log 1', coords: []
  },
  {
    id: 2, name: 'log 2', coords: []
  },
]

const logs = (state = defaultLogs, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LOG:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          coords: action.coords
        }
      ]
    case actionTypes.ADD_POSITION_TO_LOG:
      console.log(state, action)
      return state.map(log => {
        if (log.id !== action.logID) {
          return log
        }
        return {
          ...log,
          coords: [
            ...log.coords,
            action.position
          ]
        }
      })
    default:
      return state
  }
}

const geoLogger = (state = defaultLogger, action) => {
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

const geoSettings = (state = defaultGeoSettings, action) => {
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

const geoApp = combineReducers({
  logs,
  geoLogger,
  geoSettings
})

export default geoApp