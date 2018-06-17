import { fromJS } from 'immutable';

import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../actions';

const initState = fromJS({
  isOpen: false,
});

export default function dialogReducer(state = initState, action) {
  switch (action.type) {
    case SHOW_DIALOG:
      return state
        .set('isOpen', true)
        .set('content', action.payload.content);
    case HIDE_DIALOG:
      return state.set('isOpen', false);
    default:
      return state;
  }
}
