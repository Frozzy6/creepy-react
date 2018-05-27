import { put, takeEvery } from from 'redux-saga/effects';
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

function* callRequestAuth(action){
  const {
    login,
    password,
  } = action.payload;
  yield put(genericStartAC(REQUEST_AUTH));

  const authData = yield fetchAuth(login, password);
  if (authData){
    yield put(genericSuccessAC(REQUEST_AUTH, { authData }));
  } else {
    yield put(genericFailAC(REQUEST_AUTH));
  }
}

export default [
  takeEvery(REQUEST_AUTH, callRequestAuth),
];
