import { combineReducers } from 'redux'

import logs from './logs';
import geoLogger from './geoLogger';
import geoSettings from './geoSettings';

const geoApp = combineReducers({
  logs,
  geoLogger,
  geoSettings
})



export default geoApp
