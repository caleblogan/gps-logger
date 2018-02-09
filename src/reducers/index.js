import { combineReducers } from 'redux'

import logs from './logs';
import geoLogger from './geoLogger';
import geoSettings from './geoSettings';
import auth, {token} from './auth'

const geoApp = combineReducers({
  logs,
  geoLogger,
  geoSettings,
  auth,
  token
})



export default geoApp
