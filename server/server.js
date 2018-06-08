import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import swig from 'swig-templates';
import device from 'express-device';
import session from 'express-session';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import Helmet from 'react-helmet';

import configureStore from '../app/utils/configureStore';
import { AppContainer } from '../app/containers';
import { getEnvVaribale } from '../app/utils/env';
import rootSaga from '../app/sagas';
import { REQUEST_AUTH, SET_LOGO_NUM } from '../app/actions';
import { SUCCESS } from '../app/actions/baseActions';

import tokenManager from './tokenManager';
import apiOauthRouter from './api/oauth';

const LOGOS_COUNT = 6;
const ENV = getEnvVaribale();
const app = express();

tokenManager.getAppToken();

// if (ENV === 'development') {
//   /* eslint-disable */
//   const webpack = require('webpack');
//   const webpackDevMiddleware = require('webpack-dev-middleware');
//   const webpackConfig = require('../webpack.config.js');
//   /* eslint-enable */
//
//   const compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: path.join(__dirname, '../', 'public'),
//     writeToDisk: filePath => filePath.endsWith('bundle.js') || filePath.endsWith('bundle.js.map'),
//   }));
// }

/* TODO: change to getEnv from utils */
app.set('port', process.env.PORT || 3000);
app.enable('trust proxy');
app.use(compression());
app.use(morgan('dev'));
app.use(session({
  secret: 'sXuPBOkmgBsXDcKW',
  resave: true,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.set('view engine', 'html');
app.use(device.capture());

/* Middleware section */
const cors = require('./middleware/cors');
const debug = require('./middleware/debug');

app.use(cors);
app.use(debug);

/*
  Site internal api and server side proxy
  Example flow:
    client auth -> [server internal auth] -> api auth -> [server] -> client
*/
app.use('/actions/', apiOauthRouter);

const render = (store, url) => renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <AppContainer />
      </StaticRouter>
    </Provider>
);

app.use((req, res) => {
  const usrSession = req.session;

  const store = configureStore();
  const sagasPromise = store.runSaga(rootSaga).done;
  render(store, req.url);

  /* if user already have session */
  if (usrSession.oauth) {
    store.dispatch({
      type: REQUEST_AUTH + SUCCESS,
      payload: { authData: usrSession.oauth },
    });
  }

  store.dispatch({
    type: SET_LOGO_NUM,
    payload: { number: Math.round(Math.random() * LOGOS_COUNT) },
  });
  console.log(store.getState().app.toJS());
  sagasPromise.then(() => {
    /* dispatch oauth event if data exist */
    const html = render(store, req.url);
    const helmet = Helmet.renderStatic();
    const snapshot = new Buffer.from(JSON.stringify(store.getState()), 'utf-8').toString('base64');

    const page = swig.renderFile('views/index.html', {
      css: 'main',
      snapshot,
      html,
      helmet,
    });

    res.status(200).send(page);
  });
  store.close();
});
//
// app.use(async function(req, res, next) {
//   const usrSession = req.session;
//   const HOST = req.headers.host;
//   const flux = new Flux();
//
//   flux.getActions('AppActions').setDeviceType(req.device.type);
//   flux.getActions('AppActions').setEnv(NODE_ENV);
//
//   const cssFileame = ( req.device.type === "desktop" ? "main" : "mobile" );
//
//
//   /* Get token from session for api request */
//   if (usrSession.oauth) {
//     console.log('Recive token from session', usrSession.oauth );
//     flux.getActions('AppActions').setToken( usrSession.oauth );
//     // TODO: refresh token if expired
//   }
//
//   const patchedRoutes = patchRouteHooks(routes.default, { flux });
//
//   const routeMatchCallback = async function( err, redirectLocation, renderProps ){
//     if (err) {
//       res.status(500).send(err.message)
//     } else if (redirectLocation) {
//       let redirectStr = redirectLocation.pathname + redirectLocation.search;
//       res.status(302).redirect(redirectStr);
//     } else if (renderProps) {
//       try {
//         // const routes = renderProps.router.routes;
//
//         /*
//           Server rendering
//           Triger actions listed
//           Get remote data if need from API
//           [0] - component
//           [1] - render object
//         */
//         /*const route = renderProps.routes[1];
//         await fetchComponentData( flux, renderProps.components, renderProps.params, route );
//
//
//         // Making react element for answer
//         const appElement = (
//             <RouterContext {...renderProps}
//                 createElement={(Component, props) => {
//                     return <Component flux={flux} {...props} />;
//                 }}
//             />
//         );
//
//         const html = ReactDOM.renderToString(appElement);
//         const snapshot = new Buffer( flux.takeSnapshot(), 'utf-8').toString('base64');
//         const helmet = Helmet.renderStatic();
//
//         const page = swig.renderFile(
//           __dirname + '/../views/index.html', {
//             html: html,
//             snapshot: snapshot,
//             helmet: helmet,
//             css: cssFileame,
//             env: NODE_ENV,
//             devType: req.device.type
//           });
//           */
//         //TODO: check config ssr args
//         // Only client-side rendering
//         const page = swig.renderFile('views/index.html', {css: "main"});
//         res.status(200).send(page);
//       } catch (err) {
//         console.log( err )
//         if ( process.env.NODE_ENV == 'production' ) {
//           // Send html shutter
//           const html = ReactDOM.renderToString(React.createElement(ErrorComponent));
//           const page = swig.renderFile(
//              __dirname + '/../views/error_prod.html',
//              { html: html, css: cssFileame });
//           res.status(500).send(page);
//         } else {
//           // Detalize server error
//           console.log(err);
//           const page = swig.renderFile(
//              __dirname + '/../views/error_dev.html',
//              { error: err.toString(), stack: err.stack.toString() });
//           res.status(200).send(page);
//         }
//       }
//     } else {
//       /* Not found error 404 */
//       const html = ReactDOM.renderToString(React.createElement(NotFoundComponent));
//       const page = swig.renderFile(
//          __dirname + '/../views/index.html',
//           { html: html, css: cssFileame });
//       res.status(404).send(page);
//     }
//   }
//
//   RouterMatch({
//       routes: patchedRoutes,
//       location: req.url
//     },
//     routeMatchCallback
//   );
// });


console.log('Starting creepy-web with NODE_ENV: ', process.env.NODE_ENV);
const server = require('http').createServer(app);

server.listen(app.get('port'), () => {
  console.log(`creepy-web listening on port ${app.get('port')}`);
});

app.use((err, req, res) => {
  console.log('\nThis error shows when express app has bad configuration');
  console.log('-OR-');
  console.log('In case of serious backend error.\n');
  console.log(err);

  const page = swig.renderFile(
    `${__dirname}/../views/error_dev.html`,
    { error: err, stack: err.stack },
  );

  res.status(err.status || 500).send(page);
});

/* sockets test section */
const io = require('socket.io')(server);

let onlineUsers = 0;
io.sockets.on('connection', (socket) => {
  onlineUsers += 1;

  io.sockets.emit('onlineUsers', { onlineUsers });

  socket.on('disconnect', () => {
    onlineUsers -= 1;
    io.sockets.emit('onlineUsers', { onlineUsers });
  });
});
