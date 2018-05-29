import { all } from 'redux-saga/effects';

import storiesSagas from './stories';
import oauthSagas from './oauth';

export default function* root() {
  yield all([
    ...storiesSagas,
    ...oauthSagas,
  ])
}
