import * as utils from "./utils";

export const apiMiddleware = api => store => next => action => {
  if (action.name === '_api') {
    console.log('api', api)
    if (!api.isAuthed()) {
      const token = store.getState().token || utils.storageGet('token')
      console.log('token', token)
      api.auth(token)
    }
    return action(store.dispatch, store.getState, api)
  } else {
    next(action)
  }
}
