export const actionTypes = {
  ADD_NEW_LOG: 'ADD_NEW_LOG',
  ADD_POSITION_TO_LOG: 'ADD_POSITION_TO_LOG',
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
