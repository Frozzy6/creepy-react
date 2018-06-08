import { fork, all } from 'redux-saga/effects';

import storiesSagas from './stories';
import oauthSagas from './oauth';

export default function* root() {
  yield all([
    fork(storiesSagas),
    fork(oauthSagas),
  ]);
}
