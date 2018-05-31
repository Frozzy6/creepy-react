import React, { Component } from 'react';
import { Link } from 'react-router';
import Recaptcha from 'react-recaptcha';

import AuthForm from '../../Common/AuthForm';
import RegisterForm from '../../Common/RegisterForm';

class AuthSidebarModule extends Component {
  constructor( props ){
    super(props);
    this.state = {
      currentTab: 'auth',
    };
  }

  switchTab(tab) {
    this.setState({ currentTab: tab });
  }

  render() {
    const {
      authState,
      registerError,
      requestAuthAC,
      requestRegAC,
    } = this.props;

    const isLoginTabShow = this.state.currentTab == 'auth';
    const widgets = [(
      <AuthForm
        handleRegisterClick={this.switchTab.bind(this, 'register')}
        handleAuthClick={requestAuthAC}
        authState={authState}
      />
    ),(
      <RegisterForm
        handleAuthClick={this.switchTab.bind(this, 'auth')}
        handleRegisterClick={requestRegAC}
        registerError={registerError}
      />
    )];

    const widet = ( isLoginTabShow ? widgets[0] : widgets[1] );

    return (
      <div className="sidebar-item sidebar-item__signup">
        <h2>{isLoginTabShow ? 'Авторизация' : 'Регистрация'}</h2>
        <div className="sidebar-item-body">{widet}</div>
      </div>
  )}
}

export default AuthSidebarModule;
