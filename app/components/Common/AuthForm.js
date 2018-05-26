import React from 'react';
import { Link } from 'react-router-dom';

import { REGISTER_MODAL_ITEM } from '../RegisterModal/RegisterModal';

class AuthForm extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      login: '',
      password: '',
    }
  }

  handleChange( event ){
    event.preventDefault();
    // this.authActions.updateFormData( event.target.name, event.target.value );
  }

  handleSubmitForm( event ) {
    event.preventDefault();

    // const login = this.state.login;
    // const password = this.state.password;
    //
    // if ( login.length === 0 ) {
    //   event.target.querySelector('[name=login]').focus()
    //   return false;
    // }
    //
    // if ( password.length === 0 ) {
    //   event.target.querySelector('[name=password]').focus()
    //   return false;
    // }
    //
    // this.authActions.login(login, password);
  }

  render(){
    const {
      openDialogAC,
    } = this.props;
    const isAuthFail = false;
    const isSendingData = false;

    const wrongAuthHtml = ( isAuthFail ? (
      <div className="controls-block">
        <div className="auth-bad">Ошибка. Неверные данные авторизации</div>
      </div>
    ) : null );

    const loadingHTML = ( isSendingData ? (
        <div className="auth-loading">
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
          <button className="signup-btn" type="submit">Войти</button>
          <div className="wanna-register">
            <p>Нет аккаунта?</p>
            <a onClick={( e ) => {
              openDialogAC(REGISTER_MODAL_ITEM);
            }}>Регистрация</a>
          </div>
        </div>
        { wrongAuthHtml }
        { loadingHTML }
      </form>
    )
  }
}

export default AuthForm;
