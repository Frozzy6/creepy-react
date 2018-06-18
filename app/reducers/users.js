import { fromJS } from 'immutable';
import {
  REQUEST_USER_INFO,
  REQUEST_USER_ADD_STORY,
  REQUEST_USER_PUB_INFO,
  UPLOAD_AVATAR_IMAGE,
} from '../actions';
import {
  START,
  FAIL,
  SUCCESS,
} from '../actions/baseActions';

const loadingState = {
  loading: false,
  success: false,
  fail: false,
};

const initState = fromJS({
  user: null,
  userPubInfo: [],
  userStory: {
    data: {
      title: '',
      content: '',
    },
    state: { ...loadingState },
  },
});

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_USER_INFO + SUCCESS: {
      const { userData } = action.payload;
      return state
        .set('user', fromJS(userData));
    }
    case REQUEST_USER_ADD_STORY + START:
      return state
        .setIn(['userStory', 'state'], fromJS({ ...loadingState }));
    case REQUEST_USER_ADD_STORY + SUCCESS:
      return state
        .setIn(['userStory', 'state', 'success'], true)
        .setIn(['userStory', 'state', 'loading'], false);
    case REQUEST_USER_ADD_STORY + FAIL:
      return state
        .setIn(['userStory', 'state', 'fail'], true)
        .setIn(['userStory', 'state', 'loading'], false);
    case REQUEST_USER_PUB_INFO + SUCCESS: {
      const { userPubInfo } = action.payload;
      return state
        .set('userPubInfo', fromJS(userPubInfo));
    }
    default:
      return state;
  }
}
