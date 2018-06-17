import { combineReducers } from 'redux';

import app from './app';
import oauth from './oauth';
import stories from './stories';
import dialog from './dialog';
import tags from './tags';
import users from './users';

const rootReducer = combineReducers({
  app,
  oauth,
  stories,
  tags,
  dialog,
  users,
});

export default rootReducer;
