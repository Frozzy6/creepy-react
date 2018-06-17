import { fromJS } from 'immutable';
import { SET_LOGO_NUM } from '../actions';

const initState = fromJS({
  logoNumber: -1,
  emv: null,
  deviceType: null,
  loading: false,
});

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOGO_NUM:
      return state.set('logoNumber', action.payload.number);
    default:
      return state;
  }
}
