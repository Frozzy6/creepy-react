import Immutable, { fromJS } from 'immutable';
import {
  REQUEST_STORY,
  REQUEST_STORIES,
  REQUEST_LIKE,
  REQUEST_DISLIKE,
} from '../actions';
import { SUCCESS } from '../actions/baseActions';

const initState = Immutable.Map(fromJS({
  entries: [],
  story: null,
  showPagination: false,
  count: -1,
}));

const setLikeOrDislike = (story, uID, action) => {
  const storyID = story.get('uID');
  if (storyID !== uID) {
    return story;
  }
  const isLike = action === 'like';
  const likesCount = story.get('likesCount');
  return story
    .set('wasLiked', isLike)
    .set('likesCount', isLike ? likesCount + 1 : likesCount - 1);
};

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
    case REQUEST_LIKE + SUCCESS: {
      const { uID } = action.payload;
      let newState = state;
      const entries = state.get('entries').map(story => setLikeOrDislike(story, uID, 'like'));
      newState = newState.set('entries', entries);
      const story = state.get('story');
      if (story) {
        newState = newState.set('story', setLikeOrDislike(story, uID, 'like'));
      }
      return newState;
    }
    case REQUEST_DISLIKE + SUCCESS: {
      const { uID } = action.payload;
      let newState = state;
      const entries = state.get('entries').map(story => setLikeOrDislike(story, uID, 'dislike'));
      newState = newState.set('entries', entries);
      const story = state.get('story');
      if (story) {
        newState = newState.set('story', setLikeOrDislike(story, uID, 'dislike'));
      }
      return newState;
    }
    default:
      return state;
  }
}
