import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';
import config from '../../config.js';

const API_HOST = config.API_HOST;

function fetchStory(id){
  const url = `${API_HOST}/stories/${id}`;
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

//TODO: move to stories.js sagas
//TODO: should write helpers actionsGenerator, smth like:
//TODO: genericSuccessAC(REQUEST_STORIES, payload)
//TODO: genericStartAC(REQUEST_STORIES, payload)
//TODO: genericFailAC(REQUEST_STORIES, payload)
//TODO: to automaticly concats events with constants: REQUEST_STORIES + START, etc
function* callFetchStories(action) {
  const {
    query,
    offset = 1,
  } = action.payload;

  yield put({type: actions.REQUEST_STORIES + actions.START});

  const [stories, count] = yield all([
    fetchStories(query, offset),
    fetchStoriesCount()
  ]);
  if (stories && count) {
    yield put({type: actions.SHOW_PAGINATION});
    yield put({type: actions.REQUEST_STORIES + actions.SUCCESS, payload: {stories, count}});
  } else {
    yield put({type: actions.REQUEST_STORIES + actions.FAIL});
  }
}

function* callFetchStory(action) {
  yield put({type: actions.REQUEST_STORY + actions.START});

  const story = yield fetchStory(action.payload.id);
  if (story) {
    yield put({type: actions.REQUEST_STORY + actions.SUCCESS, payload: {stories: [story]}});
  } else {
    yield put({type: actions.REQUEST_STORY + actions.FAIL});
  }
}

function* getStoriesSaga() {
  yield takeEvery(actions.REQUEST_STORIES, callFetchStories);
}

function* getStorySaga() {
  yield takeEvery(actions.REQUEST_STORY, callFetchStory);
}


export default function* root() {
  yield all([
    fork(getStoriesSaga),
    fork(getStorySaga),
  ])
}
