import Immutable, { fromJS } from 'immutable';
import {
  REQUEST_STORY,
  REQUEST_STORIES,
} from '../actions';
import { SUCCESS } from '../actions/baseActions';

const initState = Immutable.Map(fromJS({
  entries: [],
  story: {},
  showPagination: false,
  count: -1,
}));

export default function storiesReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_STORIES + SUCCESS: {
      const {
        stories,
        count,
      } = action.payload;

      const showPagination = stories.length > 1;
      return state
        .set('entries', fromJS(stories))
        .set('count', count)
        .set('showPagination', showPagination);
    }
    case REQUEST_STORY + SUCCESS: {
      const {
        story,
      } = action.payload;

      return state
        .set('story', fromJS(story))
        .set('showPagination', false);
    }
    default:
      return state;
  }
}
