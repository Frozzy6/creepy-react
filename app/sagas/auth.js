import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_AUTH,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config.js';

const API_HOST = config.API_HOST;
const HOST = config.HOST;

function fetchAuth(login, password) {
  const URL = `${HOST}/actions/oauth/token`;

  return axios.post(URL, { login, password })
    .then(response => response.data)
    //TODO: should to make normal logging
    .catch(e => {console.log('something going wrong', e);});
}

function* callRequestAuth(action) {
  const {
    login,
    password,
  } = action.payload;
  yield put(genericStartAC(REQUEST_AUTH));

  const authData = yield fetchAuth(login, password);
  if (authData){
    console.log(authData);
    yield put(genericSuccessAC(REQUEST_AUTH, { authData }));
  } else {
    yield put(genericFailAC(REQUEST_AUTH));
  }
}

export default [
  takeEvery(REQUEST_AUTH, callRequestAuth),
];
