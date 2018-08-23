import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

const store = (extra) => createStore(
  combineReducers({
    ...reducers,
  }),
  {},
  compose(
    applyMiddleware(thunk, logger),
  )
);

export default store;
