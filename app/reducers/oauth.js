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

const state = {
  loading: false,
  success: false,
  fail: false,
};

const initState = fromJS({
  auth: {
    user: null,
    state: {...state},
  },
  register: {
    registerError: null,
    state: {...state},
  }
});

export default function oauthReducer(state = initState, action) {
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
