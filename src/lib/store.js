import { createStore, applyMiddleware } from 'redux';
import {apiMiddleware} from './middleware'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import ApiClient from '../api/apiClient'
import geoApp from '../reducers';
import * as utils from "./utils";


export default createStore(
  geoApp,
  applyMiddleware(
    logger,
    apiMiddleware(new ApiClient()),
    thunk
  )
);
