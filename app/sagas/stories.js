import {
  put,
  takeEvery,
  all,
  call,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_STORY,
  REQUEST_STORIES,
  SHOW_PAGINATION,
  REQUEST_STORIES_BY_TAG,
  REQUEST_LIKE,
  REQUEST_DISLIKE,
  REQUEST_INITIAL_DATA_FOR_USER,
  APPEND_COMMENT,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config';

const { API_HOST } = config;
const HTTP_NO_CONTENT = 204;

function fetchStory(token, id) {
  const url = `${API_HOST}/stories/${token === 'random' ? token : id}`;
  return axios(url)
    .then(response => response.data)
    // TODO: should to make normal logging
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function fetchStoriesCount() {
  const url = `${API_HOST}/stories/count`;

  return axios(url)
    .then(response => response.data.count)
    // TODO: should to make normal logging
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function fetchStories(query, offset) {
  const token = (query === 'stories' ? 'latest' : 'scary');

  const url = `${API_HOST}/stories/${token}/${offset}`;

  return axios(url)
    .then(response => response.data)
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callFetchStories(action) {
  const {
    query,
    offset = 1,
  } = action.payload;
  yield put(genericStartAC(REQUEST_STORIES));

  const [stories, count] = yield all([
    fetchStories(query, offset),
    fetchStoriesCount(),
  ]);
  if (stories && count) {
    yield put({ type: SHOW_PAGINATION });
    yield put(genericSuccessAC(REQUEST_STORIES, { stories, count }));
  } else {
    yield put(genericFailAC(REQUEST_STORIES));
  }
}

function* callFetchStory(action) {
  yield put(genericStartAC(REQUEST_STORY));

  const story = yield call(fetchStory, action.payload.token, action.payload.id);
  if (story) {
    yield put(genericSuccessAC(REQUEST_STORY, { story }));
  } else {
    yield put(genericFailAC(REQUEST_STORY));
  }
}

function fetchStoriesByTag(tag) {
  const url = `${API_HOST}/stories/tag/${tag}`;

  return axios(url)
    .then(response => response.data)
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callFetchStoriesByTag(action) {
  const { tag } = action.payload;

  yield put(genericStartAC(REQUEST_STORIES_BY_TAG));

  const stories = yield fetchStoriesByTag(tag);
  if (stories) {
    yield put(genericSuccessAC(REQUEST_STORIES_BY_TAG, { stories }));
  } else {
    yield put(genericFailAC(REQUEST_STORIES_BY_TAG));
  }
}

function requestStoryLike(uID, action) {
  const url = `${API_HOST}/stories/${action}/${uID}`;

  return axios.post(url)
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callRequsetLike(action) {
  const { uID } = action.payload;
  yield put(genericStartAC(REQUEST_LIKE));

  const response = yield call(requestStoryLike, uID, 'like');
  if (response && response.status === HTTP_NO_CONTENT) {
    yield put(genericSuccessAC(REQUEST_LIKE, { uID }));
  } else {
    yield put(genericFailAC(REQUEST_LIKE));
  }
}

function* callRequsetDislike(action) {
  const { uID } = action.payload;
  yield put(genericStartAC(REQUEST_DISLIKE));

  const response = yield call(requestStoryLike, uID, 'unlike');
  if (response.status === HTTP_NO_CONTENT) {
    yield put(genericSuccessAC(REQUEST_DISLIKE, { uID }));
  } else {
    yield put(genericFailAC(REQUEST_DISLIKE));
  }
}


function requestInitialData(uIDs) {
  const url = `${API_HOST}/stories/initial`;

  return axios.post(url, { uIDs })
    .then(response => response.data)
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callRequestInitialData(action) {
  const { uIDs } = action.payload;
  yield put(genericStartAC(REQUEST_INITIAL_DATA_FOR_USER));

  const initialData = yield call(requestInitialData, uIDs);
  if (initialData) {
    yield put(genericSuccessAC(REQUEST_INITIAL_DATA_FOR_USER, { initialData }));
  } else {
    yield put(genericFailAC(REQUEST_INITIAL_DATA_FOR_USER));
  }
}


function appenComment(uID, content) {
  const url = `${API_HOST}/comments/`;

  return axios.put(url, { uID, content })
    .then(response => response.data)
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callAppendComment(action) {
  const { uID, msg } = action.payload;
  yield put(genericStartAC(APPEND_COMMENT));

  const comment = yield call(appenComment, uID, msg);
  if (comment) {
    yield put(genericSuccessAC(APPEND_COMMENT, { comment, uID }));
  } else {
    yield put(genericFailAC(APPEND_COMMENT));
  }
}

export default function* watchStories() {
  yield takeEvery(REQUEST_STORIES, callFetchStories);
  yield takeEvery(REQUEST_STORY, callFetchStory);
  yield takeEvery(REQUEST_STORIES_BY_TAG, callFetchStoriesByTag);
  yield takeEvery(REQUEST_LIKE, callRequsetLike);
  yield takeEvery(REQUEST_DISLIKE, callRequsetDislike);
  yield takeEvery(REQUEST_INITIAL_DATA_FOR_USER, callRequestInitialData);
  yield takeEvery(APPEND_COMMENT, callAppendComment);
}
