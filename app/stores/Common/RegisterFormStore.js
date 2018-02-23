const MSG_ERRORS_LOOKUP = {
  login_bad: { field: 'login', message: 'Некорректный логин'},
  login_already_exists: { field: 'login', message: 'Логин занят'},
  login_short: { field: 'login', message: 'Логин коротковат'},
  login_empty: { field: 'login', message: 'Введите логин'},
  login_bad_symbols: { field: 'login', message: 'Логин может состоять из латиницы, цифр и символов - _'},

  email_bad: { field: 'email', message: 'Неправильный email'},
  email_already_exists: { field: 'email', message: 'Email занят'},

  password_bad: { field: 'password', message: 'Некорректный пароль'},
  password_tooshort: { field: 'password', message: 'Пароль коротковат'},
  password_empty: { field: 'password', message: 'Введите пароль'},

  repassword_empty: { field: 'passwordRepeat', message: 'Повторите парль'},
  repassword_sim: { field: 'passwordRepeat', message: 'Пароли должны совпадать'},

  recapthca_bad: { field: 'gRecaptchaResponse', message: 'Вы ведь не робот? :)'},

  another: { field: 'login', message: 'Регестрация не удалась :('}
}


class RegisterFormStore {
  constructor( ID ) {
    this.bindActions(this.alt.getActions('RegisterFormActions' + ID));
    this.sendingData = false;
    this.wrongCred = false;

    this.data = {
      login: '',
      email: '',
      password: '',
      passwordRepeat: '',
      gRecaptchaResponse: ''
    };

    this.errors = {
      login: '',
      email: '',
      password: '',
      passwordRepeat: '',
      gRecaptchaResponse: ''
    };
  }

  onUpdateFormData( params ){
    const name = params[0];
    const data = params[1];

    this.data[name] = data;
  }

  onRegisterStart(){
    this.alt.getActions('AppActions').startLoading.defer()
    this.wrongCred = false;
    this.sendingData = true;
  }

  onRegisterSuccess(data) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.sendingData = false;
  }

  onRegisterFails(errorMessage) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.sendingData = false;
    this.wrongCred = true;
  }

  onSetRegisterError( data ) {
    const field = data[0];
    const message = data[1];

    this.errors[field] = message;
  }

  onSetRegisterErrorCode( code ) {
    const MSG_ERROR = MSG_ERRORS_LOOKUP[code];

    this.errors[MSG_ERROR.field] = MSG_ERROR.message;
  }

  onClearRegisterError( field ) {
    this.errors[field] = '';
  }

  onSendRecaptcha(data) {
    this.data.gRecaptchaResponse = data;
    this.errors.gRecaptchaResponse = '';
  }

}

export default RegisterFormStore;
