import Immutable, { fromJS } from 'immutable';

export const STORIES_DATA = 'STORIES_DATA';

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
  showPagination: false,
  count: -1
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
        payload: { stories }
      } = action;

      return state
        .set('entries', fromJS(stories))
        .set('count', -1)
        .set('showPagination', false);

    default:
      return state;
  }
}
