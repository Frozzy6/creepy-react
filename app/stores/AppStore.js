import axios from 'axios';

class AppStore {
  constructor() {
    this.bindActions(this.alt.getActions('AppActions'));
    this.loading = false;

    this.user = null;
    this.token = null;
    this.expiredAt = null;
    this.refreshToken = null;
    this.refreshTokenExpiresAt = null;
    this.deviceType = null;
    this.env = null;
  }

  onStartLoading() {
    this.loading = true;
  }

  onStopLoading() {
    this.loading = false;
  }

  onSetToken( data ) {
    this.user = data.user;
    this.token = data.token;
    this.expiredAt = data.expiredAt;
    this.refreshToken = data.refreshToken;
    this.refreshTokenExpiresAt = data.refreshTokenExpiresAt;

    if ( this.token ) {
      this.setAuth(`Bearer ${this.token}`)
    } else {
      this.setAuth( null );
    }
  }

  onLogout(){
    this.onSetToken({});
  }

  setAuth( auth ){
    axios.defaults.headers.common['Authorization'] = auth;
  }

  onSetDeviceType( deviceType ) {
    this.deviceType = deviceType;
  }

  onSetEnv( env ) {
    this.env = env;
  }
}

export default AppStore;
