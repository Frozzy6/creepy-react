import { fromJS } from 'immutable';

import {
  REQUEST_AUTH,
  REQUEST_LOGOUT,
  REQUEST_REG,
} from '../actions';
import {
  START,
  SUCCESS,
  FAIL,
} from '../actions/baseActions';

const loadingState = {
  loading: false,
  success: false,
  fail: false,
};

const initState = fromJS({
  auth: {
    user: null,
    state: { ...loadingState },
  },
  register: {
    registerError: null,
    state: { ...loadingState },
  },
});

export default function oauthReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return state.merge({
        auth: {
          state: { ...loadingState },
        },
      });
    case REQUEST_AUTH + START:
      return state
        .setIn(['auth', 'state', 'loading'], true);
    case REQUEST_AUTH + SUCCESS: {
      const { authData } = action.payload;
      return state
        .setIn(['auth', 'user'], fromJS(authData))
        .setIn(['auth', 'state', 'loading'], false)
        .setIn(['auth', 'state', 'success'], true);
    }
    case REQUEST_AUTH + FAIL:
      return state
        .setIn(['auth', 'state', 'loading'], false)
        .setIn(['auth', 'state', 'fail'], true);
    case REQUEST_LOGOUT + SUCCESS:
      return state
        .setIn(['auth', 'user'], null);
    case REQUEST_REG + SUCCESS: {
      const { regData } = action.payload;
      return state
        .setIn(['auth', 'user'], fromJS(regData));
    }
    default:
      return state;
  }
}
