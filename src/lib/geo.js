export default class GeoTracker {
  constructor() {
    this._watchID = null;
  }

  /**
   * Returns a promise that will call resolve with the coords of the users current location
   * if geolocation is enabled and availble. Otherwise it calls reject with false.
   * @returns {Promise} that resolves with coords or rejects with false on error
   */
  attemptToEnable() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords)
      }, error => {
        reject(error)
      });
    })
  }

  /**
   * Watches the users current location. Calls the cb function when location changes.
   * @param cb
   */
  startWatching(cb) {
    if (this._watchID) {
      navigator.geolocation.clearWatch(this._watchID);
    }
    this._watchID = navigator.geolocation.watchPosition(cb);
  }

  stopWatching() {
    navigator.geolocation.clearWatch(this._watchID);
    this._watchID = null;
  }

  isAvailable() {
    return 'geolocation' in navigator;
  }

}
