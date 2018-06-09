import { fork, all } from 'redux-saga/effects';

import storiesSagas from './stories';
import oauthSagas from './oauth';
import usersSagas from './users';

export default function* root() {
  yield all([
    fork(storiesSagas),
    fork(oauthSagas),
    fork(usersSagas),
  ]);
}
