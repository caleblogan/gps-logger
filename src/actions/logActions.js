export const actionTypes = {
  ADD_NEW_LOG: 'ADD_NEW_LOG',
  ADD_POSITION_TO_LOG: 'ADD_POSITION_TO_LOG',
  GET_LOGS_FETCH: 'GET_LOGS_FETCH',
  GET_LOGS_SUCCESS: 'GET_LOGS_SUCCESS',
  GET_LOGS_ERROR: 'GET_LOGS_ERROR',
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

export function getLogs() {
  return (dispatch, getState, api) => {
    const {token} = getState()
    return api(token).getLogs()
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
