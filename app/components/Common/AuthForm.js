import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthForm extends Component {
  constructor( props ){
    super(props);

    this.state = {
      login: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleChange(event) {
    const {
      name: key,
      value,
    } = event.target;
    this.setState({ [key]: value });
    event.preventDefault();
  }

  handleSubmitForm(event) {
    const {
      login,
      password,
    } = this.state;
    const {
      target,
    } = event;
    event.preventDefault();

    if ( login.length === 0 ) {
      target.querySelector('[name=login]').focus()
      return false;
    }

    if ( password.length === 0 ) {
      target.querySelector('[name=password]').focus()
      return false;
    }

    console.log('need auth');
  }

  render(){
    const {
      handleRegisterClick,
    } = this.props;
    const isAuthFail = false;
    const isSendingData = false;

    const wrongAuthHtml = ( isAuthFail ? (
      <div className="controls-block">
        <div className="auth-bad">Ошибка. Неверные данные авторизации</div>
      </div>
    ) : null );

    const loadingHTML = ( false ? (
        <div className="loading auth-loading">
          <img src="/images/spinner.svg"/>
        </div>
    ) : null );

    this.exitCallback = (e) => {
      e.preventDefault();
    };
    return (
      <form className="auth-form" onSubmit={this.handleSubmitForm}>
        <div className="controls-block">
          <input placeholder="Логин" name="login" type="text" autoComplete="off" maxLength="50" value={this.state.login} onChange={this.handleChange}/>
          <input placeholder="Пароль" name="password" type="password" autoComplete="off" maxLength="50" value={this.state.password} onChange={this.handleChange}/>
        </div>
        <div className="controls-block">
          <button
            className="signup-btn"
            type="submit"
          >
            Войти
          </button>
          <div className="wanna-register">
            <p>Нет аккаунта?</p>
            <a
              onClick={( e ) => {
                handleRegisterClick();
              }}
            >
              Регистрация
            </a>
          </div>
        </div>
        { wrongAuthHtml }
        { loadingHTML }
      </form>
    )
  }
}

export default AuthForm;
