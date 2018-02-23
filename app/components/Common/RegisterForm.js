import React from 'react';
import {Link} from 'react-router';
import Recaptcha from 'react-recaptcha';

import RegisterFormActions from '../../actions/Common/RegisterFormActions';
import RegisterFormStore from '../../stores/Common/RegisterFormStore';

let counter = 0;

/* EMAIL */
const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* LOGIN */
const loginRE = /^([a-zA-Z0-9 _-]+)$/;

class RegisterForm extends React.Component {
  constructor( props ){
    super(props);
    counter++;

    const flux = this.props.flux;
    this.flux = flux;

    const ACTIONS_NAME = `RegisterFormActions${counter}`;
    const STORE_NAME = `RegisterFormStore${counter}`;

    this.regActions = flux.getActions(ACTIONS_NAME);
    if ( !this.regActions ) {
      flux.addActions( ACTIONS_NAME, RegisterFormActions, {}, flux );
      // flux.createActions( RegisterFormActions, this.regActions, { flux, ACTIONS_NAME });
      this.regActions = flux.getActions(ACTIONS_NAME);
      this.regStore = flux.createStore(RegisterFormStore, STORE_NAME, counter );
    } else {
      this.regStore = flux.getStore(STORE_NAME);
    }

    this.state = this.regStore.getState();;
    this.userHandleSubmit = this.props.handleFomrSubmit;
    this.recaptchaInstance = null;

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.regStore.listen(this.onChange);
  }

  componentWillUnmount() {
    counter--;
    this.regStore.unlisten(this.onChange);
    this.flux.recycle(this.regStore);
  }

  onChange(state) {
    this.setState(state);
  }

  handleChange( event ){
    this.regActions.updateFormData( event.target.name, event.target.value );
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
    const sendingData = this.state.sendingData;

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
          <input placeholder="Логин" type="text" name="login" autoComplete="off" maxLength="50" value={registerData.login} onChange={this.handleChange} />
          <div className="control-error">{registerErrors.login}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Email" type="email" name="email" autoComplete="off" maxLength="50" value={registerData.email} onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.email}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Пароль" type="password" name="password" autoComplete="off" maxLength="50" value={registerData.password} onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.password}</div>
        </div>
        <div className="controls-block">
          <input placeholder="Пароль" type="password" name="passwordRepeat" autoComplete="off" maxLength="50" value={registerData.passwordRepeat} onChange={this.handleChange}/>
          <div className="control-error">{registerErrors.passwordRepeat}</div>
        </div>
        <div className="controls-block recaptcha">
          <Recaptcha elementID={`recaptcha-${counter}`} ref={e => this.recaptchaInstance = e} render="explicit" sitekey="6LesOxcUAAAAAH9i0IygDSN8TVgwaIs6hyZPzyxt" render="explicit" onloadCallback={function(){/*DUMMY FUNC HELLO LIBRARY*/}} verifyCallback={this.regActions.sendRecaptcha}/>
          <div className="control-error" style={{paddingLeft: "31px"}}>{registerErrors.gRecaptchaResponse}</div>
        </div>
        <div className="controls-block">
          <button className="register-btn" type="submit">Регистрация</button>
        </div>
        <div className="controls-block">
          <div className="wanna-login">
            <p>Уже есть аккаунт?  <Link onClick={( e ) => { this.exitCallback(e); }}>Войти</Link></p>
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
