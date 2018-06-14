import Immutable, { fromJS } from 'immutable';

import { SUCCESS } from '../actions/baseActions';
import { REQUEST_STORIES_BY_TAG, REQUEST_ALL_TAGS } from '../actions';

const initState = Immutable.Map(fromJS({
  list: [],
  stories: [],
  showPagination: false,
  count: -1,
}));

export default function tags(state = initState, action) {
  switch (action.type) {
    case REQUEST_ALL_TAGS + SUCCESS: {
      const { tags } = action.payload;

      return state
        .set('list', fromJS(tags));
    }
    case REQUEST_STORIES_BY_TAG + SUCCESS: {
      const { stories } = action.payload;

      return state
        .set('stories', fromJS(stories));
    }
    default:
      return state;
  }
}
