const NODE_ENV = process.env.NODE_ENV || window.__ENV__;

import axios from 'axios';
import config from '../../../config.js';

class AuthFormActions {
  constructor(flux) {
    this.flux = flux;
    this.generateActions(
      'updateFormData',
      'authStart',
      'authSuccess',
      'authFail'
    );
  }

  login( login, password ) {
    const URL = `${config[NODE_ENV].HOST}/actions/oauth/token`;
    this.authStart();

    axios.post( URL, { login, password } )
      .then( response => {
        this.flux.actions.AppActions.setToken(response.data)
        this.authSuccess();
      })
      .catch( err => {
        this.authFail( err );
      });

    // To prevent warn message
    return true;
  }
}



export default AuthFormActions;
