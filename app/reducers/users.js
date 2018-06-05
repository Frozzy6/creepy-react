import Immutable, { fromJS } from 'immutable';
import { REQUEST_USER_INFO } from '../actions';
import { SUCCESS } from '../actions/baseActions';

const initState = Immutable.Map(fromJS({
  user: null,
}));

export default function tags(state = initState, action) {
  switch (action.type) {
    case REQUEST_USER_INFO + SUCCESS: {
      const { userData } = action.payload;

      return state
        .set('user', fromJS(userData));
    }
    default:
      return state;
  }
}
