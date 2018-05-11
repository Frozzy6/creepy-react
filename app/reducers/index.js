import { combineReducers } from 'redux';

import app from './app';
import stories from './stories';

const rootReducer = combineReducers({
  app,
  stories
});

export default rootReducer;
