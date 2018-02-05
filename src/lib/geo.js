export default class GeoTracker {
  constructor() {
    this._geolocationWatchID = null;
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
    if (this.geolocationWatchID) {
      navigator.geolocation.clearWatch(this.geolocationWatchID);
    }
    this.geolocationWatchID = navigator.geolocation.watchPosition(cb);
  }

  stopWatching() {
    navigator.geolocation.clearWatch(this.geolocationWatchID);
    this.geolocationWatchID = null;
  }

  isAvailable() {
    return 'geolocation' in navigator;
  }

  __errors() {
    let _errors = [];
    if (this.showNotAvailableError()) {
      _errors.push({
        message: 'Geolocation is not available in this browser. Please try a new browser like Chrome.',
        onDismiss: this.disableAvailableError
      })
    }
    if (this.showNotEnabledError()) {
      _errors.push({
        message: 'Geolocation is currently disabled. Turn it on first to start recording.',
        onDismiss: this.disableEnabledError
      })
    }
    return _errors;
  }

}
