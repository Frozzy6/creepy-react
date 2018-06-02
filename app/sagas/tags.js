import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

import { requestTags, types, receiveTags } from '../actions/tags';
import { 
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';

import config from '../../config.js';

function fetchAllTags() {
  // TODO: maybe move urls to constants ?
  const url = `${config.API_HOST}/tags/all`;

  return axios(url)
    .then((response) => response.data)
    .catch((error) => error); // FIXME: handle error 
}

function* callFetchAllTags() {
  yield put(genericStartAC(types.REQUEST_ALL_TAGS));

  const tags = yield fetchAllTags();

  if (tags) {
    yield put(receiveTags(tags));
  } else {
    yield put(genericFailAC(types.REQUEST_ALL_TAGS));
  }
}

export default [
  takeEvery(types.REQUEST_ALL_TAGS, callFetchAllTags),
]