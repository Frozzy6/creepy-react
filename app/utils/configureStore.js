import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';

const initialState = {
  stories: {
    entries: [],
    count: -1
  },
  app: {}
}

export default function configureStore(initialState = {}){
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  store.runSaga = sagaMiddleware.run;
  return store;
};
