import { fromJS } from 'immutable';
import { SET_LOGO_NUM, OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../actions';

const initState = fromJS({
  logoNumber: -1,
  emv: null,
  deviceType: null,
  loading: false,
  sidebar: {
    isOpen: false,
  },
});

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return state.setIn(['sidebar', 'isOpen'], true);
    case CLOSE_SIDEBAR:
      return state.setIn(['sidebar', 'isOpen'], false);
    case SET_LOGO_NUM:
      return state.set('logoNumber', action.payload.number);
    default:
      return state;
  }
}
