export function storagePut(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function storageGet(key) {
  return JSON.parse(window.localStorage.getItem(key))
}