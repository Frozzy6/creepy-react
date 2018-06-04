import Immutable, { fromJS } from 'immutable';
import { REQUEST_STORIES_BY_TAG } from '../actions';
import { SUCCESS } from '../actions/baseActions';

const initState = Immutable.Map(fromJS({
  tags: [],
  stories: [],
  showPagination: false,
  count: -1,
}));

export default function tags(state = initState, action) {
  switch (action.type) {
    case REQUEST_STORIES_BY_TAG + SUCCESS: {
      const { stories } = action.payload;

      return state
        .set('stories', fromJS(stories));
    }
    default:
      return state;
  }
}
