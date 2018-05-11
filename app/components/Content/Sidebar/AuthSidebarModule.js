import React from 'react';
import {Link} from 'react-router';
import Recaptcha from 'react-recaptcha';


import AuthForm from '../../Common/AuthForm';
import RegisterForm from '../../Common/RegisterForm';

class AuthSidebarModule extends React.Component {
  constructor( props ){
    super(props);

    const flux = props.flux;

    this.flux = flux;
    this.authSidebarStore = flux.getStore('AuthSidebarStore');
    this.authSidebarActions = flux.getActions('AuthSidebarActions');

    this.state = this.authSidebarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.authSidebarStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.authSidebarStore.unlisten(this.onChange);
  }

  // tab - register, auth
  switchTab( tab ) {
    this.authSidebarActions.showTab( tab );
    // e.stopPropagation();
  }

  render(){
    const isLoginTabShow = this.state.currentTab == 'auth';
    const widgets = [(
      <AuthForm flux={this.flux} exitCallback={this.switchTab.bind(this, 'register')} />
    ),(
      <RegisterForm flux={this.flux} exitCallback={this.switchTab.bind(this, 'auth')}/>
    )];

    const widet = ( isLoginTabShow ? widgets[0] : widgets[1] );


    return (
      <div className="sidebar-item sidebar-item__signup">
        <h2>{isLoginTabShow ? 'Авторизация' : 'Регистрация'}</h2>
        <div className="sidebar-item-body">{widet}</div>
      </div>
  )}

  onChange(state) {
    this.setState(state);
  }

}

export default AuthSidebarModule;
