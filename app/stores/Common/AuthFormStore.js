class AuthFormStore {
  constructor( ID ) {
    this.bindActions(this.alt.getActions('AuthFormActions' + ID));
    this.sendingData = false;
    this.wrongCred = false;

    this.login = '',
    this.password = '';
  }

  onUpdateFormData( params ){
    const name = params[0];
    const data = params[1];

    this[name] = data;
  }

  onAuthStart(){
    this.alt.getActions('AppActions').startLoading.defer()
    this.sendingData = true;
  }

  onAuthSuccess(data) {
    //TODO: call appActions instead of internal
    const appActions = this.alt.getActions('AppActions');
    const contentActions = this.alt.getActions('ContentActions');

    appActions.stopLoading.defer();
    this.sendingData = false;

    /* Clear user input data */
    this.login = '',
    this.password = '';

    contentActions.getInitial.defer();
  }

  onAuthFail(errorMessage) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.sendingData = false;
    this.wrongCred = true;
  }
}

export default AuthFormStore;
