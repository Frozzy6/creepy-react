import React from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import { isEmpty, pick, identity } from 'lodash';

/* EMAIL */
const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* LOGIN */
const loginRE = /^([a-zA-Z0-9 _-]+)$/;

const MSG_ERRORS_LOOKUP = {
  login_bad: { control: 'login', msg: 'Некорректный логин' },
  login_already_exists: { control: 'login', msg: 'Логин занят' },
  login_short: { control: 'login', msg: 'Логин коротковат' },
  login_empty: { control: 'login', msg: 'Введите логин' },
  login_bad_symbols: { control: 'login', msg: 'Логин может состоять из латиницы, цифр и символов - _' },

  email_bad: { control: 'email', msg: 'Неправильный email' },
  email_already_exists: { control: 'email', msg: 'Email занят' },

  password_bad: { control: 'password', msg: 'Некорректный пароль' },
  password_tooshort: { control: 'password', msg: 'Пароль коротковат' },
  password_empty: { control: 'password', msg: 'Введите пароль' },

  repassword_empty: { control: 'passwordRepeat', msg: 'Повторите парль' },
  repassword_sim: { control: 'passwordRepeat', msg: 'Пароли должны совпадать' },

  recapthca_bad: { control: 'gRecaptchaResponse', msg: 'Вы ведь не робот? :)' },

  another: { control: 'login', msg: 'Регестрация не удалась :(' },
};

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        login: '',
        email: '',
        password: '',
        passwordRepeat: '',
        gRecaptchaResponse: '',
      },
      errors: {
        login: null,
        email: null,
        password: null,
        passwordRepeat: null,
        gRecaptchaResponse: null,
      },
    };
  }

  handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    this.setState(prevState => ({
      errors: prevState.errors,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  }

  addError = (control, type) => {
    this.setState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [control]: type,
      },
    }));
  }

  clearError = control => this.addError(control, null);

  getMergedErros() {
    const { errors } = this.state;
    const { registerError } = this.props;

    // combine internal errors with resived
    const combinedErrs = (registerError ? ({
      ...errors,
      [registerError.control]: registerError.msg,
    }) : errors);

    return combinedErrs;
  }

  getErrorMessage(control) {
    const errors = this.getMergedErros();
    const errorType = errors[control];
    const msgObj = MSG_ERRORS_LOOKUP[errorType];

    return msgObj && msgObj.msg;
  }

  // TODO: simplify and make msg codes from store. not raw string messages
  async handleSubmitForm(event) {
    const {
      data: {
        login,
        email,
        password,
        passwordRepeat,
        gRecaptchaResponse,
      },
    } = this.state;
    event.preventDefault();

    if (login.length > 0 && login.length < 4) {
      this.addError('login', 'login_short');
    } else if (login.length === 0) {
      this.addError('login', 'login_empty');
    } else if (!loginRE.test(login)) {
      this.addError('login', 'login_bad_symbols');
    } else {
      this.clearError('login');
    }

    if (!emailRE.test(email)) {
      this.addError('email', 'email_bad');
    } else {
      this.clearError('email');
    }

    if (password.length > 0 && password.length < 4) {
      this.addError('password', 'password_tooshort');
    } else if (password.length === 0) {
      this.addError('password', 'password_empty');
    } else {
      this.clearError('password');
    }

    if (passwordRepeat.length === 0) {
      this.addError('passwordRepeat', 'repassword_empty');
    } else if (password !== passwordRepeat) {
      this.addError('passwordRepeat', 'repassword_sim');
    } else {
      this.clearError('passwordRepeat');
    }

    if (gRecaptchaResponse.length === 0) {
      this.addError('gRecaptchaResponse', 'recapthca_bad');
    } else {
      this.clearError('gRecaptchaResponse');
    }

    // TODO: get rid of this
    // setState is async function
    setTimeout(this.resolveToSend, 0);
  }

  resolveToSend = () => {
    const { handleRegisterClick } = this.props;
    const { data } = this.state;
    const errors = this.getMergedErros();
    const isValidated = isEmpty(pick(errors, identity));
    if (isValidated) {
      handleRegisterClick(data);
      this.recaptchaInstance.reset();
    }
  }

  render() {
    const {
      handleAuthClick,
    } = this.props;
    const sendingData = false;

    const loadingHTML = (
      <div className="auth-loading">
        <img src="/images/spinner.svg"/>
      </div>
    );

    return (
      <form className="reg-form" onSubmit={(e) => { this.handleSubmitForm(e); }}>
        <div className="controls-block">
          <input placeholder="Логин" type="text" name="login" autoComplete="off" maxLength="50" onChange={this.handleChange} />
          <div className="control-error">{this.getErrorMessage('login')}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Email" type="email" name="email" autoComplete="off" maxLength="50" onChange={this.handleChange}/>
          <div className="control-error">{this.getErrorMessage('email')}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Пароль" type="password" name="password" autoComplete="off" maxLength="50" onChange={this.handleChange}/>
          <div className="control-error">{this.getErrorMessage('password')}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Повторите пароль" type="password" name="passwordRepeat" autoComplete="off" maxLength="50" onChange={this.handleChange}/>
          <div className="control-error">{this.getErrorMessage('passwordRepeat')}</div>
        </div>
        <div className="controls-block recaptcha">
          <Recaptcha elementID={'recaptcha-0'} ref={(e) => { this.recaptchaInstance = e; }} render="explicit" sitekey="6LesOxcUAAAAAH9i0IygDSN8TVgwaIs6hyZPzyxt" onloadCallback={() => { /* DUMMY FUNC HELLO LIBRARY */ }} verifyCallback={(value) => {
            this.setState(prevState => ({
              ...prevState,
              data: {
                ...prevState.data,
                gRecaptchaResponse: value,
              },
            }));
          }}/>
          <div className="control-error" style={{ paddingLeft: '31px' }}>{this.getErrorMessage('gRecaptchaResponse')}</div>
        </div>
        <div className="controls-block">
          <button className="register-btn" type="submit">Регистрация</button>
        </div>
        <div className="controls-block">
          <div className="wanna-login">
            <p>Уже есть аккаунт?  <a onClick={() => {
              handleAuthClick();
            }}>Войти</a></p>
          </div>
        </div>
        { sendingData ? loadingHTML : null }
      </form>
    );
  }
}

RegisterForm.propTypes = {
  handleFomrSubmit: PropTypes.func.isRequired,
  registerError: PropTypes.shape({}).isRequired,
  handleRegisterClick: PropTypes.func.isRequired,
  handleAuthClick: PropTypes.func.isRequired,
  linkCallback: PropTypes.func,
};

export default RegisterForm;
