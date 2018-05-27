import { all } from 'redux-saga/effects';

import storiesSagas from './stories';

export default function* root() {
  yield all([
    ...storiesSagas,
  ])
}
