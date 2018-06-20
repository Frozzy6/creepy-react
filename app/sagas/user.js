import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  UPLOAD_AVATAR_IMAGE,
  closeDialogAC,
} from '../actions';
import {
  genericStartAC,
  genericSuccessAC,
  genericFailAC,
} from '../actions/utils/actionGeneric';
import config from '../../config';

const { API_HOST } = config;

function uploadAvatarImage(file) {
  const url = `${API_HOST}/user/upload`;
  const formData = new FormData();
  formData.append('avatar', file);
  console.log(file);
  const opts = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post(url, formData, opts)
    .then(response => response.data)
    // TODO: should to make normal logging
    .catch((e) => {
      console.log('something going wrong', e);
    });
}

function* callUploadAvatarImage(action) {
  yield put(genericStartAC(UPLOAD_AVATAR_IMAGE));
  const { file } = action.payload;

  const accountImage = yield call(uploadAvatarImage, file);
  if (accountImage) {
    yield put(genericSuccessAC(UPLOAD_AVATAR_IMAGE, { accountImage }));
    yield put(closeDialogAC());
  } else {
    yield put(genericFailAC(UPLOAD_AVATAR_IMAGE));
  }
}


export default function* watchStories() {
  yield takeEvery(UPLOAD_AVATAR_IMAGE, callUploadAvatarImage);
}
