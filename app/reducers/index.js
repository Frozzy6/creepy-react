import { combineReducers } from 'redux';

import app from './app';
import stories from './stories';
import dialog from './dialog';

const rootReducer = combineReducers({
  app,
  stories,
  dialog,
});

export default rootReducer;
