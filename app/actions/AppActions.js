import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const HOST = config[NODE_ENV].HOST;

class AppActions {
  constructor() {
    this.generateActions(
      'showRegisterMessageBox',
      'startLoading',
      'stopLoading',
      'setToken',
      'logout',
      'setDeviceType',
      'setEnv'
    );
  }

  doLogout(){
    const URL = `${HOST}/actions/oauth/logout`;

    axios.post( URL )
      .catch( err => this.authFail( err ) )
      .finally(() => this.logout() );

    return true;
  }

  static displayName = 'AppActions';
}

export default AppActions;
