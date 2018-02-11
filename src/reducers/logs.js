import {actionTypes} from '../actions/logActions';

const defaultLogs = [
  {
    id: 0, name: 'log 0', positions: [
    {
      latitude: 51.507351, longitude: -0.127758,
    },
    {
      latitude: 52.507351, longitude: -0.147758,
    },
  ]
  },
  {
    id: 1, name: 'log 1', positions: []
  },
  {
    id: 2, name: 'log 2', positions: []
  },
]

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LOG:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          positions: action.positions
        }
      ]
    case actionTypes.ADD_POSITION_TO_LOG:
      return state.map(log => {
        if (log.id !== action.logID) {
          return log
        }
        return {
          ...log,
          positions: [
            ...log.positions,
            action.position
          ]
        }
      })
    case actionTypes.SET_LOGS:
      return [...action.logs]
    default:
      return state
  }
}
