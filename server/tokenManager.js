import request from 'superagent';
import config from '../config';

const NODE_ENV = process.env.NODE_ENV;

const CLIENT_ID = 'scary-react';
const CLIENT_SECRET = 'jnugr3sfjjc5wsxc';

const API_HOST = config[NODE_ENV].API_HOST;

class TokenManager {
  constructor(){
    this.appAuth = 'Basic ' + new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    this.appToken = null;
    this.appExpiresAt = null;

    this.usrAuthToken = null;
    this.usrExpiresAt = null;
    this.usrRefreshToken = null;
    this.usrRefreshExpiresAt = null;
  }

  /* Private common method for token request */
  async _requestToken( reqBody ){
    const GET_TOKEN_URL = `${API_HOST}oauth/token`;
    const manager = this;

    return new Promise((resolve, reject) => {
      request
        .post(GET_TOKEN_URL)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', manager.appAuth)
        .send(reqBody)
        .end((err, res ) => {
          if ( err ) {
            console.log(err);
            reject( err );
          } else {
            resolve( res.body );
          }
        })
    });
  }

  /* Get token for private use: send statistic, request data, etc */
  async getAppToken(){
    const tokenData = await this._requestToken({grant_type: 'client_credentials'});

    this.appToken = tokenData.accessToken;
    this.appExpiresAt = tokenData.accessTokenExpiresAt;
  }

  /* Check private tokend and update if necessary */
  async checkAppToken(){
    if ( this.isExpired(this.appExpiresAt)) {
      await this.getAppToken();
    }
  }


  /* Generate token for not autorized user */
  async getUserToken( username, password ){
    const usrToken = await this._requestToken({
      grant_type: 'password',
      username: username,
      password: password
    });

    return {
      token: usrToken.accessToken,
      expiredAt: usrToken.accessTokenExpiresAt,
      refreshToken: usrToken.refreshToken,
      refreshTokenExpiresAt: usrToken.refreshTokenExpiresAt
    }
  }

  async getUserInfo( token ){
    const ABOUT_URL = `${API_HOST}oauth/me`;
    const manager = this;

    return new Promise((resolve, reject) => {
      request
        .get(ABOUT_URL)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res ) => {
          if ( err ) {
            console.log(err);
            reject( err );
          } else {
            console.log(res.body)
            resolve( res.body );
          }
        })
    });
  }

  isExpired( date ){
    if (date instanceof Date) {
      return date < new Date();
    } else if (typeof date === "string" || date instanceof String) {
      return new Date(date) < new Date();
    } else {
      throw new Error('Auth: cant convert argument to date');
    }
  }
}

export default new TokenManager();
