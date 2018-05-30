import { fromJS } from 'immutable';

import {
  REQUEST_AUTH,
  REQUEST_LOGOUT,
} from '../actions' ;
import {
  START,
  SUCCESS,
  FAIL,
} from '../actions/baseActions';

const initState = fromJS({
  logoNumber: Math.floor(Math.random() * 5) + 1,
  auth: {
    user: null,
    state: {
      loading: false,
      success: false,
      fail: false,
    },
  },
});

export default function appReducer(state = initState, action) {
  switch(action.type) {
    case REQUEST_AUTH:
      return state.merge({
        auth: {
          state: {
            loading: false,
            success: false,
            fail: false,
          }
        }
      });
    case REQUEST_AUTH + START:
      return state
        .setIn(['auth','state','loading'], true);
    case REQUEST_AUTH + SUCCESS:
      const { authData } = action.payload;
      return state
        .setIn(['auth', 'user'], fromJS(authData))
        .setIn(['auth','state','loading'], false)
        .setIn(['auth','state','success'], true);
    case REQUEST_AUTH + FAIL:
      return state
        .setIn(['auth','state','loading'], false)
        .setIn(['auth','state','fail'], true);
    case REQUEST_LOGOUT + SUCCESS:
      return state
        .setIn(['auth', 'user'], null);
    default:
      return state;
  }
}
