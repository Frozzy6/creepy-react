import { fork, all } from 'redux-saga/effects';

import storiesSagas from './stories';
import oauthSagas from './oauth';
import usersSagas from './users';
import userSaga from './user';
import tagsSagas from './tags';


export default function* root() {
  yield all([
    fork(storiesSagas),
    fork(oauthSagas),
    fork(userSaga),
    fork(usersSagas),
    fork(tagsSagas),
  ]);
}
