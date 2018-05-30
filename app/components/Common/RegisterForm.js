import React from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';

/* EMAIL */
const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* LOGIN */
const loginRE = /^([a-zA-Z0-9 _-]+)$/;

class RegisterForm extends React.Component {
  constructor( props ){
    super(props);

    this.state = {
      data: {},
      errors: {},
    };
  }

  handleChange = event => {
    const {
      name,
      value,
    } = event.target;

    this.setState(prevState => ({
      errors: prevState.errors,
      data: {
        ...prevState.data,
        [name]: value,
      }
    }))
  }

  //TODO: simplify and make msg codes from store. not raw string messages
  handleSubmitForm(event) {
    event.preventDefault();

    const data = this.state.data;
    const errors = this.state.errors;

    if ( data.login.length > 0 && data.login.length < 4 ) {
      this.regActions.setRegisterErrorCode('login_short');
    } else if ( data.login.length == 0 ) {
      this.regActions.setRegisterErrorCode('login_empty');
    } else if (!loginRE.test(data.login)) {
      this.regActions.setRegisterErrorCode('login_bad_symbols');
    } else {
      this.regActions.clearRegisterError('login');
    }

    if ( !emailRE.test( data.email ) ) {
      this.regActions.setRegisterErrorCode('email_bad');
    } else {
      this.regActions.clearRegisterError('email');
    }

    if ( data.password.length > 0 && data.password.length < 4 ) {
      this.regActions.setRegisterErrorCode('password_tooshort');
    } else if ( data.password.length == 0 ) {
      this.regActions.setRegisterErrorCode('password_empty');
    } else {
      this.regActions.clearRegisterError('password');
    }

    if (data.passwordRepeat.length == 0 ) {
      this.regActions.setRegisterErrorCode('repassword_empty');
    } else if ( data.password != data.passwordRepeat ) {
      this.regActions.setRegisterErrorCode('repassword_sim');
    } else {
      this.regActions.clearRegisterError('passwordRepeat');
    }

    if ( data.gRecaptchaResponse.length == 0 ) {
      this.regActions.setRegisterErrorCode('recapthca_bad');
    } else {
      this.regActions.clearRegisterError('gRecaptchaResponse');
    }

    for ( let field in data ) {
      if ( data[field].length == 0 ) {
        // let node = event.target.querySelector(`[name=${field}]`);
        // ( node && node.focus() );
        return false;
      }
    }

    /* Prevents sending data if errors */
    for ( let err in errors ) {
      if ( errors[err] ) {
        return false;
      }
    }
    this.regActions.register( data );
    this.recaptchaInstance.reset();
  }

  render(){
    const {
      handleAuthClick,
    } = this.props;
    const sendingData = false;

    const loadingHTML = (
      <div className="auth-loading">
        <img src="/images/spinner.svg"/>
      </div>
    );

    const registerErrors = this.state.errors;
    const registerData = this.state.data;

    this.exitCallback = this.props.exitCallback || function() {/*Do nothing*/};
    return (
      <form className="reg-form" onSubmit={( e ) => { this.handleSubmitForm(e); }}>
        <div className="controls-block">
          <input placeholder="Логин" type="text" name="login" autoComplete="off" maxLength="50" onChange={this.handleChange} />
          <div className="control-error">{registerErrors.login}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Email" type="email" name="email" autoComplete="off" maxLength="50" onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.email}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Пароль" type="password" name="password" autoComplete="off" maxLength="50"  onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.password}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Повторите пароль" type="password" name="passwordRepeat" autoComplete="off" maxLength="50" onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.passwordRepeat}</div>
        </div>
        <div className="controls-block recaptcha">
          <Recaptcha elementID={`recaptcha-0`} ref={e => this.recaptchaInstance = e} render="explicit" sitekey="6LesOxcUAAAAAH9i0IygDSN8TVgwaIs6hyZPzyxt" render="explicit" onloadCallback={function(){/*DUMMY FUNC HELLO LIBRARY*/}} verifyCallback={function(){
            console.log('not implimented yet');
          }}/>
          <div className="control-error" style={{paddingLeft: "31px"}}>{registerErrors.gRecaptchaResponse}</div>
        </div>
        <div className="controls-block">
          <button className="register-btn" type="submit">Регистрация</button>
        </div>
        <div className="controls-block">
          <div className="wanna-login">
            <p>Уже есть аккаунт?  <a onClick={( e ) => {
              handleAuthClick();
            }}>Войти</a></p>
          </div>
        </div>
        { sendingData ? loadingHTML : null }
      </form>
    );
  }
}
//
// RegisterForm.propTypes = {
//  handleFomrSubmit: React.PropTypes.func.isRequired,
//  linkCallback: React.PropTypes.func
// }

export default RegisterForm;
