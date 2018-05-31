import express from 'express';
import request from 'superagent';

import tokenManager from '../tokenManager';
import config from '../../config';

const API_HOST = config.API_HOST;

const router = express.Router();

router.route("/oauth/token").post(async function( req, res, next ){
  try {
    const token = await tokenManager.getUserToken(req.body.login, req.body.password);
    const userInfo = await tokenManager.getUserInfo( token.token );

    token.user = userInfo.user;
    req.session.oauth = token;

    res.status(200).send(token);
  } catch( e ) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.route("/oauth/logout").post(function( req, res, next ){
  req.session.oauth = {};
  res.sendStatus(200);
});

router.route("/oauth/register").post(async function( req, res, next ){
  const data = req.body.data;
  console.log(data);
  const checkRecaptcha = function(){
    return new Promise( ( resolve, reject ) => {
      request.post(`${API_HOST}/recaptcha/verify`)
        .send({ response: data.gRecaptchaResponse })
        .then( result => resolve( result.body ) )
        .catch( err => reject( err ) );
    });
  };

  /* Validate data */
  const loginRE = /^([a-zA-Z0-9 _-]+)$/;
  const login = data.login;
  if ( !login || !loginRE.test(login) || login.length < 4 || login.length > 20 ) {
    return res.status(403).send({ 'error': true, data: {
        type: 'login',
        code: 'login_bad',
      },
    });
  }

  const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( !emailRE.test(data.email) ) {
    return res.status(403).send({ 'error': true, data: {
        type: 'email',
        code: 'email_bad',
      }
    });
  }

  const password = data.password;
  if ( !password || password.length < 4 || password.length > 20 ) {
    return res.status(403).send({ 'error': true, data: {
        type: 'password',
        code: 'password_bad',
      }
    });
  }

  if ( data.passwordRepeat != password ) {
    return res.status(403).send({ 'error': true, data: {
        type: 'passwordRepeat',
        code: 'repassword_empty',
      }
    });
  }

  if ( !data.gRecaptchaResponse ) {
    return res.status(403).send({ 'error': true, data: {
        type: 'gRecaptchaResponse',
        code: 'recapthca_bad',
      }
    });
  }

  /* Check recaptcha */
  const recaptchaAnwer = await checkRecaptcha();

  /* Bad news for robots */
  if ( !recaptchaAnwer.success ) {
    res.status(403).send({ 'error': true, data: {
      type: 'gRecaptchaResponse',
      code: 'recapthca_bad'
      }
    });
    return false;
  }

  /* Refresh client token */
  await tokenManager.getAppToken();

  request
    .post(`${API_HOST}/oauth/register`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', `Bearer ${tokenManager.appToken}`)
    .send(data)
    .end( async function(err, result ) {
      if ( err ) {
        res.status(403).send(result.body);
      } else {
        const resBody = result.body;
        try {
          const token = await tokenManager.getUserToken(resBody.username, resBody.password);
          const userInfo = await tokenManager.getUserInfo( token.token );

          token.user = userInfo.user;
          req.session.oauth = token;

          res.status(200).send(token);
        } catch( e ) {
          res.sendStatus(400);
        }
      }
    })
});

//TODO: make it works
router.route("/oauth/refresh").post((req, res) => res.sendStatus(400));

export default router;
