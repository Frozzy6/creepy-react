import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './utils/configureStore';
import rootSaga from './sagas';

import { AppContainer } from './containers';

import './sass/App.scss';

const mountNode = document.getElementById('app');
const store = configureStore();

store.runSaga(rootSaga);

const componentToRender = (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
);

if (window.__SSR__) {
  ReactDOM.hydrate(componentToRender, mountNode);
} else {
  ReactDOM.render(componentToRender, mountNode);
}

// https://stackoverflow.com/questions/40280369/use-anchors-with-react-router
const { hash } = window.location;
if (hash !== '') {
  let retries = 0;
  const id = hash.replace('#', '');
  const scroll = () => {
    retries += 0;
    if (retries > 10) return;
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => element.scrollIntoView(), 0);
    } else {
      setTimeout(scroll, 100);
    }
  };
  scroll();
}
