const NODE_ENV = process.env.NODE_ENV || window.__ENV__;

import axios from 'axios';
import config from '../../../config.js';

class RegisterFormActions {
  constructor(flux) {
    this.flux = flux;
    this.generateActions(
      'updateFormData',
      'registerStart',
      'sendRecaptcha',
      'registerFails',
      'registerSuccess',
      'setRegisterError',
      'clearRegisterError',
      //TODO: it's the temorary action to lookup message
      // for best functionality rewrite funtion above
      'setRegisterErrorCode'
    );
  }

  register( data ) {
    const URL = `${config[NODE_ENV].HOST}/actions/oauth/register`;
    this.registerStart();

    axios.post( URL, { data } )
      .then( response => {
        this.flux.actions.AppActions.setToken(response.data)
        this.registerSuccess();
      })
      .catch( err => {
        console.log(err);
        // TODO: make it simple
        const msgCode = (err && err.response && err.response.data && err.response.data.msg);
        if ( msgCode ) {
        //make as lookup
          this.setRegisterErrorCode(msgCode)
        } else {
          this.setRegisterError('login', 'Регестрация не удалась :(')
        }
        this.registerFails();
      });

    // To prevent warn message
    return true;
  }
}



export default RegisterFormActions;
