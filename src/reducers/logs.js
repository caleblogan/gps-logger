import {actionTypes} from '../actions/logActions';

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

export default (state = defaultLogs, action) => {
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
