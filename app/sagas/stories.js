import { put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_STORY,
  REQUEST_STORIES,
  SHOW_PAGINATION,
  REQUEST_STORIES_BY_TAG,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config';

const { API_HOST } = config;

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

  const story = yield fetchStory(action.payload.token, action.payload.id);
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

export default [
  takeEvery(REQUEST_STORIES, callFetchStories),
  takeEvery(REQUEST_STORY, callFetchStory),
  takeEvery(REQUEST_STORIES_BY_TAG, callFetchStoriesByTag),
];
