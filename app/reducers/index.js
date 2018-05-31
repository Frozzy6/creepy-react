import { combineReducers } from 'redux';

import app from './app';
import oauth from './oauth';
import stories from './stories';
import dialog from './dialog';

const rootReducer = combineReducers({
  app,
  oauth,
  stories,
  dialog,
});

export default rootReducer;
