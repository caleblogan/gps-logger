export const actionTypes = {
  ADD_NEW_LOG: 'ADD_NEW_LOG',
  ADD_POSITION_TO_LOG: 'ADD_POSITION_TO_LOG',
  SET_LOGS: 'SET_LOGS',
  GET_LOGS_FETCH: 'GET_LOGS_FETCH',
  GET_LOGS_SUCCESS: 'GET_LOGS_SUCCESS',
  GET_LOGS_FAILURE: 'GET_LOGS_FAILURE',
}

let nextLogID = 3
export function addLog(name) {
  return {
    type: actionTypes.ADD_NEW_LOG,
    id: nextLogID++,
    name: name,
    positions: []
  }
}

export function addLogPosition(position, logID) {
  return {
    type: actionTypes.ADD_POSITION_TO_LOG,
    position,
    logID
  }
}

function setLogs(logs) {
  return {
    type: actionTypes.SET_LOGS,
    logs
  }
}

/**
 * Loads the logs from the the api and initializes the store
 * @returns Promise
 */
export function initLogs() {
  return function _api(dispatch, getState, api) {
    dispatch({type: actionTypes.GET_LOGS_FETCH})
    return api.getLogs()
      .then(response => {
        console.log(response)
        dispatch(setLogs(response.data.map(log => (
          {
            id: log.id,
            name: log.name,
            positions: []
          }
        ))))
        dispatch({type: actionTypes.GET_LOGS_SUCCESS})
      })
      .catch(() => {
        dispatch({type: actionTypes.GET_LOGS_FAILURE})
      })
  }
}

export function loadAllPositions() {
  return function _api(dispatch, getState, api) {
    return api.getAllPositions()
      .then(response => {
        console.log(response.data)
        response.data.forEach(position => {
          dispatch(addLogPosition({...position}, position.log))
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}