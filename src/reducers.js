import {actionTypes} from './actions';

const defaultState = {
  logs: [
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
  ],
  activeLogID: 2,
  currentLocation: {},
  isGeolocationEnabled: true,
  isGeolocationAvailable: true,
}

const geoApp = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_LOG:
      return {...state, activeLogID: action.id}
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
    case actionTypes.ADD_NEW_LOG:
      return {
        ...state,
        logs: [
          ...state.logs,
          {
            id: action.id,
            name: action.name,
            coords: action.coords
          }
        ]
      }
    case actionTypes.ADD_POSITION_TO_LOG:
      console.log('pos:', action.position)
      return {
        ...state,
        logs: state.logs.map(log => {
          if (log.id !== state.activeLogID) {
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
      }
    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.coords
      }
    default:
      return state
  }
}

export default geoApp