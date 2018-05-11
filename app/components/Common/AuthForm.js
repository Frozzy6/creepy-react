import React from 'react';
import {Link} from 'react-router';

// import AuthFormActions from '../../actions/Common/AuthFormActions';
// import AuthFormStore from '../../stores/Common/AuthFormStore';

let counter = 0;

class AuthForm extends React.Component {
  constructor( props ){
    super(props);
    // counter++
    //
    // const flux = this.props.flux;
    // this.flux = flux;
    //
    // const ACTIONS_NAME = `AuthFormActions${counter}`;
    // const STORE_NAME = `AuthFormStore${counter}`;
    //
    // this.authActions = flux.getActions(ACTIONS_NAME);
    // if ( !this.authActions ) {
    //   flux.addActions( ACTIONS_NAME, AuthFormActions, {}, flux );
    //   // flux.createActions( AuthFormActions, this.authActions, { flux, ACTIONS_NAME });
    //   this.authActions = flux.getActions(ACTIONS_NAME);
    //   this.authStore = flux.createStore(AuthFormStore, STORE_NAME, counter );
    // } else {
    //   this.authStore = flux.getStore(STORE_NAME);
    // }
    //
    // this.state = this.authStore.getState();
    // this.handleChange = this.handleChange.bind( this );
    // this.handleSubmitForm = this.handleSubmitForm.bind(this);
    // this.onChange = this.onChange.bind( this );
  }

  componentDidMount() {
    // this.authStore.listen(this.onChange);
  }

  componentWillUnmount() {
    // counter--;
    // this.authStore.unlisten(this.onChange);
    // this.flux.recycle(this.authStore);
  }

  onChange(state) {
    // this.setState(state);
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
    const isAuthFail = this.state.wrongCred;
    const isSendingData = this.state.isSendingData;

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

    this.exitCallback = this.props.exitCallback || function() {/*Do nothing*/};
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
            <Link onClick={( e ) => { this.exitCallback(e) }}>Регистрация</Link>
          </div>
        </div>
        { wrongAuthHtml }
        { loadingHTML }
      </form>
    )
  }
}

export default AuthForm;
