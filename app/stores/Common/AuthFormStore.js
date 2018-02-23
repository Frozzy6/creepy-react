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
    this.alt.getActions('AppActions').stopLoading.defer();
    this.sendingData = false;

    /* Clear user input data */
    this.login = '',
    this.password = '';
  }

  onAuthFail(errorMessage) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.sendingData = false;
    this.wrongCred = true;
  }
}

export default AuthFormStore;
