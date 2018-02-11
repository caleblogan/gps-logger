import { combineReducers } from 'redux'

import logs from './logs';
import geoLogger from './geoLogger';
import geoSettings from './geoSettings';
import auth, {token} from './auth'
import user from './user'

const geoApp = combineReducers({
  logs,
  geoLogger,
  geoSettings,
  auth,
  token,
  user
})



export default geoApp
