import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { fromJS } from 'immutable';
import { get } from 'lodash';
import axios from 'axios';
import reducer from '../reducers';

const snapshot = {};
if (typeof window !== 'undefined') {
  const rawData = JSON.parse(decodeURIComponent(window.escape(atob(window.__snapshot__))));
  const token = get(rawData, 'oauth.auth.user.token');

  /* Set access token to request head */
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log(axios.defaults.headers.common.Authorization);
  }

  Object.keys(rawData).forEach((key) => {
    snapshot[key] = fromJS(rawData[key]);
  });
}

export default function configureStore(initialState = snapshot) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [applyMiddleware(sagaMiddleware)];

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    reducer,
    initialState,
    compose(...middlewares),
  );

  store.runSaga = sagaMiddleware.run.bind(sagaMiddleware);
  store.close = () => store.dispatch(END);
  return store;
}
