import * as utils from "./utils";

export const apiMiddleware = api => store => next => action => {
  if (action.type === 'API_CALL') {
    if (!api.isAuthed()) {
      const token = store.getState().token || utils.storageGet('token')
      api.auth(token)
    }
    return action.fn(store.dispatch, store.getState, api)
  } else {
    next(action)
  }
}
