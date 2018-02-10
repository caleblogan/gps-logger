
let localStorage = window.localStorage

export const apiMiddleware = api => store => next => action => {
  if (action.name === '_api') {
    if (!api.isAuthed()) {
      const token = store.getState().token || localStorage.getItem('token')
      api.auth(token)
    }
    return action(store.dispatch, store.getState, api)
  } else {
    next(action)
  }
}
