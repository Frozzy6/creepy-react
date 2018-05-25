import Immutable, { fromJS } from 'immutable';
import {
  REQUEST_STORY,
  REQUEST_STORIES,
} from '../actions' ;
import {
  START,
  SUCCESS,
  FAIL,
} from '../actions/baseActions';

const initState = Immutable.Map(fromJS({
  entries: [],
  story: {},
  showPagination: false,
  count: -1,
}));

export default function stories(state = initState, action) {
  switch(action.type) {
    case REQUEST_STORIES + SUCCESS: {
      const {
        payload: {
          stories,
          count
        }
      } = action;

      const showPagination = stories.length > 1;
      return state
        .set('entries', fromJS(stories))
        .set('count', count)
        .set('showPagination', showPagination);
    }
    case REQUEST_STORY + SUCCESS:
      const {
        payload: { story }
      } = action;

      return state
        .set('story', fromJS(story))
        .set('showPagination', false);

    default:
      return state;
  }
}
