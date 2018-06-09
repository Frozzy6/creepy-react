import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST_USER_ADD_STORY } from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config';

const { API_HOST } = config;

function postStory(title, content) {
  const url = `${API_HOST}/stories/new`;
  return axios.put(url, { title, content })
    .then(response => response.data)
    // TODO: should to make normal logging
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callPostStory(action) {
  yield put(genericStartAC(REQUEST_USER_ADD_STORY));
  const { title, content } = action.payload;
  // TODO: check to store has user data before send story
  console.log('post', title, content);
  const answer = yield call(postStory, title, content);
  console.log(answer);
  if (answer) {
    yield put(genericSuccessAC(REQUEST_USER_ADD_STORY));
  } else {
    yield put(genericFailAC(REQUEST_USER_ADD_STORY));
  }
}

export default function* watchStories() {
  yield takeEvery(REQUEST_USER_ADD_STORY, callPostStory);
}
