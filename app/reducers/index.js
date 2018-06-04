import { combineReducers } from 'redux';

import app from './app';
import oauth from './oauth';
import stories from './stories';
import dialog from './dialog';
import tags from './tags';

const rootReducer = combineReducers({
  app,
  oauth,
  stories,
  tags,
  dialog,
});

export default rootReducer;
