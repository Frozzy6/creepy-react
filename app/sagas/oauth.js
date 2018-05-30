import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_AUTH,
  REQUEST_REG,
  REQUEST_LOGOUT,
  closeDialogAC,
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
    yield put(genericSuccessAC(REQUEST_AUTH, { authData }));
    yield put(closeDialogAC());
  } else {
    yield put(genericFailAC(REQUEST_AUTH));
  }
}

function* callRequestReg(action) {
  yield put(genericStartAC(REQUEST_REG));
}

function requestLogout(){
  const URL = `${HOST}/actions/oauth/logout`;

  return axios.post( URL )
    .catch( err => console.log( err ) )
}

function* callRequestLogout() {
  yield put(genericStartAC(REQUEST_LOGOUT));

  const logoutData = yield requestLogout();
  if (logoutData) {
    yield put(genericSuccessAC(REQUEST_LOGOUT));
  } else {
    yield put(genericFailAC(REQUEST_LOGOUT));
  }
}

export default [
  takeEvery(REQUEST_AUTH, callRequestAuth),
  takeEvery(REQUEST_REG, callRequestReg),
  takeEvery(REQUEST_LOGOUT, callRequestLogout),
];
