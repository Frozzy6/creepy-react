import { all } from 'redux-saga/effects';

import storiesSagas from './stories';
import authSagas from './auth';

export default function* root() {
  yield all([
    ...storiesSagas,
    ...authSagas,
  ])
}
