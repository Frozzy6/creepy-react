import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_USER_ADD_STORY,
  REQUEST_USER_INFO,
  REQUEST_USER_PUB_INFO,
} from '../actions';
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
  const answer = yield call(postStory, title, content);
  if (answer) {
    yield put(genericSuccessAC(REQUEST_USER_ADD_STORY));
  } else {
    yield put(genericFailAC(REQUEST_USER_ADD_STORY));
  }
}

function requestUserInfo(username) {
  const url = `${API_HOST}/users/${username}`;

  return axios(url)
    .then(response => response.data)
    .catch((e) => {
      console.log('something went wrong', e);
    });
}

function* callRequestUserInfo(action) {
  yield put(genericStartAC(REQUEST_USER_INFO));
  const { username } = action.payload;
  const userData = yield call(requestUserInfo, username);

  if (userData) {
    yield put(genericSuccessAC(REQUEST_USER_INFO, { userData }));
  } else {
    yield put(genericFailAC(REQUEST_USER_INFO));
  }
}

function requestPubInfoOfUser(username) {
  const url = `${API_HOST}/stories/byUser/${username}`;

  return axios(url)
    .then(response => response.data)
    .catch((e) => {
      console.log('something went wrong', e);
    });
}

function* callRequestPubInfoOfUser(action) {
  yield put(genericStartAC(REQUEST_USER_PUB_INFO));
  const { username } = action.payload;
  const userPubInfo = yield call(requestPubInfoOfUser, username);

  if (userPubInfo) {
    yield put(genericSuccessAC(REQUEST_USER_PUB_INFO, { userPubInfo }));
  } else {
    yield put(genericFailAC(REQUEST_USER_PUB_INFO));
  }
}

export default function* watchStories() {
  yield takeEvery(REQUEST_USER_ADD_STORY, callPostStory);
  yield takeEvery(REQUEST_USER_INFO, callRequestUserInfo);
  yield takeEvery(REQUEST_USER_PUB_INFO, callRequestPubInfoOfUser);
}
