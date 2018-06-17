import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  REQUEST_AUTH,
  REQUEST_REG,
  REQUEST_LOGOUT,
  requestInitialAC,
  closeDialogAC,
  getUIDsOfStories,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config';

const { HOST } = config;

function fetchAuth(login, password) {
  const URL = `${HOST}/actions/oauth/token`;

  return axios.post(URL, { login, password })
    .then(response => response.data)
    // TODO: should to make normal logging
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callRequestAuth(action) {
  const {
    login,
    password,
  } = action.payload;
  yield put(genericStartAC(REQUEST_AUTH));

  const authData = yield fetchAuth(login, password);
  if (authData) {
    yield put(genericSuccessAC(REQUEST_AUTH, { authData }));
    const uIDs = yield select(getUIDsOfStories);
    if (authData.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
      console.log('set token', axios.defaults.headers.common.Authorization);
    }
    if (uIDs.size > 0) {
      yield put(requestInitialAC(uIDs.toJS()));
    }
    yield put(closeDialogAC());
  } else {
    yield put(genericFailAC(REQUEST_AUTH));
  }
}

function fetchRegister(data) {
  const URL = `${HOST}/actions/oauth/register`;

  return axios.post(URL, { data })
    .then(response => response.data)
    .catch((e) => { console.log(e); });
}

function* callRequestReg(action) {
  yield put(genericStartAC(REQUEST_REG));

  const regData = yield fetchRegister(action.payload);
  if (regData) {
    yield put(genericSuccessAC(REQUEST_REG, { regData }));
    yield put(closeDialogAC());
  } else {
    yield put(genericFailAC(REQUEST_REG, { regData }));
  }
}

function requestLogout() {
  const URL = `${HOST}/actions/oauth/logout`;
  delete axios.defaults.headers.common.Authorization;

  return axios
    .post(URL)
    .catch(err => console.log(err));
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

export default function* watchOauth() {
  yield takeEvery(REQUEST_AUTH, callRequestAuth);
  yield takeEvery(REQUEST_REG, callRequestReg);
  yield takeEvery(REQUEST_LOGOUT, callRequestLogout);
}
