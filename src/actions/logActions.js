import {apiCall} from "../api/apiClient";

export const actionTypes = {
  ADD_LOG_FETCH: 'ADD_LOG_FETCH',
  ADD_LOG_SUCCESS: 'ADD_LOG_SUCCESS',
  ADD_LOG_FAILURE: 'ADD_LOG_FAILURE',
  ADD_POSITION_TO_LOG: 'ADD_POSITION_TO_LOG',
  SET_LOGS: 'SET_LOGS',
  GET_LOGS_FETCH: 'GET_LOGS_FETCH',
  GET_LOGS_SUCCESS: 'GET_LOGS_SUCCESS',
  GET_LOGS_FAILURE: 'GET_LOGS_FAILURE',
}

export function addLogCreator(id, name, positions = []) {
  return {
    type: actionTypes.ADD_LOG_SUCCESS,
    id,
    name,
    positions: positions
  }
}

export function addLogPositionCreator(logID, position) {
  return {
    type: actionTypes.ADD_POSITION_TO_LOG,
    logID,
    position
  }
}

function setLogs(logs) {
  return {
    type: actionTypes.SET_LOGS,
    logs
  }
}

/**
 * Adds a new log. Only adds log to store if api transaction is a success.
 * @returns {_api}
 */
export function addLog(_name) {
  return apiCall((dispatch, getState, api) => {
    dispatch({type: actionTypes.ADD_LOG_FETCH})
    return api.addLog(_name)
      .then(response => {
        if (response.status === 201) {
          const {id, name, positions} = response.data
          dispatch(addLogCreator(id, name, positions))
        }
      })
      .catch(() => {
        dispatch({type: actionTypes.ADD_LOG_FAILURE})
      })
  })
}

/**
 * Adds a new position to the logID provided. Will only add log to store if api transaction is a success.
 * @param _name
 * @returns Promise
 */
export function addLogPosition(logID, _position) {
  return apiCall((dispatch, getState, api) => {
    dispatch({type: actionTypes.ADD_LOG_FETCH})
    return api.addPosition(logID, _position)
      .then(response => {
        if (response.status === 201) {
          const {latitude, longitude, accuracy, date} = response.data
          dispatch(addLogPositionCreator(logID, {latitude, longitude, accuracy, date}))
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch({type: actionTypes.ADD_LOG_FAILURE})
      })
  })
}


/**
 * Loads the logs from the the api and initializes the store
 * @returns Promise
 */
export function initLogs() {
  return apiCall((dispatch, getState, api) => {
    dispatch({type: actionTypes.GET_LOGS_FETCH})
    return api.getLogs()
      .then(response => {
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
  })
}

export function loadAllPositions() {
  return apiCall((dispatch, getState, api) => {
    return api.getAllPositions()
      .then(response => {
        response.data.forEach(position => {
          const {latitude, longitude, accuracy, date, log: id} = position
          dispatch(addLogPositionCreator(id, {latitude, longitude, accuracy, date}))
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
}