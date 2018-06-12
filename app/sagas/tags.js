import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

import { REQUEST_ALL_TAGS } from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';

import config from '../../config';

function fetchAllTags() {
  const url = `${config.API_HOST}/tags/all`;

  return axios(url)
    .then(response => response.data)
    .catch(error => error);
}

function* callFetchAllTags() {
  yield put(genericStartAC(REQUEST_ALL_TAGS));

  const tags = yield fetchAllTags();

  if (tags) {
    yield put(genericSuccessAC(REQUEST_ALL_TAGS, { tags }));
  } else {
    yield put(genericFailAC(REQUEST_ALL_TAGS));
  }
}

export default function* watchTags() {
  yield takeEvery(REQUEST_ALL_TAGS, callFetchAllTags);
}
