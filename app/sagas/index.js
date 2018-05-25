import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_STORY,
  REQUEST_RANDOM_STORY,
  REQUEST_STORIES,
  SHOW_PAGINATION,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config.js';

const API_HOST = config.API_HOST;

function fetchStory(token, id){
  const url = `${API_HOST}/stories/${token === 'random' ? token : id}`;
  return axios(url)
    .then(response => response.data)
    //TODO: should to make normal logging
    .catch(e => {console.log('something going wrong');});
}

function fetchStoriesCount() {
  const url = `${API_HOST}/stories/count`;

  return axios(url)
    .then(response => response.data.count)
    //TODO: should to make normal logging
    .catch(e => { console.log('something going wrong'); });
}

function fetchStories(query, offset) {
  const token = (query == 'stories' ? 'latest' : 'scary');
  console.log('offset', offset);
  const url = `${API_HOST}/stories/${token}/${offset}`;

  return axios(url)
    .then(response => response.data)
    .catch(e => { console.log('something going wrong'); });
}

function* callFetchStories(action) {
  const {
    query,
    offset = 1,
  } = action.payload;

  yield put(genericStartAC(REQUEST_STORIES));

  const [stories, count] = yield all([
    fetchStories(query, offset),
    fetchStoriesCount()
  ]);
  if (stories && count) {
    yield put({ type: SHOW_PAGINATION });
    yield put(genericSuccessAC(REQUEST_STORIES, {stories, count}));
  } else {
    yield put(genericFailAC(REQUEST_STORIES));
  }
}

function* callFetchStory(action) {
  yield put(genericStartAC(REQUEST_STORY));
  console.log(action.payload);
  const story = yield fetchStory(action.payload.token, action.payload.id);
  if (story) {
    yield put(genericSuccessAC(REQUEST_STORY, { story }));
  } else {
    yield put(genericFailAC(REQUEST_STORY));
  }
}

function* getStoriesSaga() {
  yield takeEvery(REQUEST_STORIES, callFetchStories);
}

function* getStorySaga() {
  yield takeEvery(REQUEST_STORY, callFetchStory);
}


export default function* root() {
  yield all([
    fork(getStoriesSaga),
    fork(getStorySaga),
  ])
}
