import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import configureStore from './utils/configureStore';
import rootSaga from './sagas';

import { AppContainer } from './containers';

const mountNode = document.getElementById('app');
const store = configureStore();

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  mountNode,
);

//
// import { ReduxAsyncConnect } from 'redux-async-connect';

/*
if ( window.__snapshot__ ) {
  flux.bootstrap(decodeURIComponent(window.escape(atob(window.__snapshot__))));
  /* Set access token to request head */
  /*
  delete axios.defaults.headers.common["Authorization"];
  // debugger;
  // setTimeout(()=>{
    axios.defaults.headers.common.Authorization = 'Bearer ' + flux.getStore('AppStore').state.token;
    console.log(axios.defaults.headers.common.Authorization)
  // })

  /* Check for extend token */
  /* Do something before request is sent */
  /*
  axios.interceptors.request.use(function (config) {
    // if ( config._skip ) {
    //   return config;
    // }
    // config._skip = true;
    var appStore = flux.getStore('AppStore');

    // var refreshToken = appStore.state.refreshToken;
    // var refreshExpAt = appStore.state.refreshTokenExpiresAt;
    var tokenExpAt = appStore.state.expiredAt;
    if ( tokenExpAt ) {
      var dateDiff = new Date(tokenExpAt) - new Date()
      console.log(`Token will expire at ${dateDiff / 1000} sec.`);

      if ( dateDiff < 0 ) {
        window.location.reload(false);
      }
    }

    //   if ( refreshToken & new Date(refreshExpAt) < new Date() ){
    //     flux.getActions('AppStore').setAuth('Basic ');
    //
    //     axios.post( '/data', {
    //       headers: { 'Content-Type': 'application/json' },
    //       data: {}
    //     } )
    //     .then( response => {})
    //     .catch( err => {
    //       window.location.reload(false);
    //     });
    //   } else {
    //     window.location.reload(false);
    //   }
    // }
    return config;
  }, function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
  });
}
*/
// console.log('Device type:', window.__DEV_TYPE__);
// flux.getActions('AppActions').setDeviceType(window.__DEV_TYPE__);
// flux.getActions('AppActions').setEnv(process.env.NODE_ENV || window.__ENV__);

// const passFluxToComponent = (Component, props) => {
//     return <Component flux={flux} {...props} />;
// };

/*
  https://stackoverflow.com/questions/40280369/use-anchors-with-react-router
function hashLinkScroll() {
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
}

RouterMatch({ history: browserHistory, routes: patchedRoutes }, async (error, redirectLocation, renderProps) => {
  if (redirectLocation) {
      window.location.pathname = redirectLocation.pathname;
  } else if (renderProps) {
    const element = <Router {...renderProps} createElement={passFluxToComponent} onUpdate={hashLinkScroll} history={browserHistory}/>;
    ReactDOM.render(element, mountNode);
  }
});
*/

/* Preload images for message box */
// [
//   '/images/bg/6-min-extra.jpg',
//   '/images/bg/4.jpg'
// ].forEach( url => (new Image()).src = url);
//
// const component = (
//   <Roter render={(props) => props } />
// );
