import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../Common/AuthForm';
import RegisterForm from '../../Common/RegisterForm';

class AuthSidebarModule extends Component {
  constructor(props) {
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

    const isLoginTabShow = this.state.currentTab === 'auth';
    const widgets = [(
      <AuthForm
        handleRegisterClick={this.switchTab.bind(this, 'register')}
        handleAuthClick={requestAuthAC}
        authState={authState}
        key={new Date()}
      />
    ), (
      <RegisterForm
        handleAuthClick={this.switchTab.bind(this, 'auth')}
        handleRegisterClick={requestRegAC}
        registerError={registerError}
        key={new Date()}
      />
    )];

    const widet = (isLoginTabShow ? widgets[0] : widgets[1]);

    return (
      <div className="sidebar-item sidebar-item__signup">
        <h2>{isLoginTabShow ? 'Авторизация' : 'Регистрация'}</h2>
        <div className="sidebar-item-body">{widet}</div>
      </div>
    );
  }
}

AuthSidebarModule.propTypes = {
  authState: PropTypes.shape({}).isRequired,
  registerError: PropTypes.shape({}).isRequired,
  requestAuthAC: PropTypes.func.isRequired,
  requestRegAC: PropTypes.func.isRequired,
};

export default AuthSidebarModule;
