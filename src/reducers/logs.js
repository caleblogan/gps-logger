import {actionTypes} from '../actions/logActions';


export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_LOG_FETCH:
      return [...state]
    case actionTypes.ADD_LOG_SUCCESS:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          positions: action.positions
        }
      ]
    case actionTypes.ADD_LOG_FAILURE:
      return [...state]
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
