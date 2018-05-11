import React from 'react';

import MessageBox from '../Common/MessageBox';
import AuthForm from '../Common/AuthForm';
import RegisterForm from '../Common/RegisterForm';

class AuthMessageBox extends React.Component {
  constructor(props){
    super(props);

    this.flux = props.flux;
    this.actions = this.flux.getActions('AuthMessageBoxActions');
    this.store = this.flux.getStore('AuthMessageBoxStore');
    this.appStore = this.flux.getStore('AppStore');

    this.state = {
      messageBox: this.store.getState(),
      appState: this.appStore.getState()
    }

    this.onChange = this.onChange.bind(this);
    this.onAppChange = this.onAppChange.bind(this);
    this.viewRegWidget = this.viewRegWidget.bind(this);
    this.viewAuthWidget = this.viewAuthWidget.bind(this);
  }

  onChange(state) {
    this.setState({ messageBox: state });
  }

  onAppChange(state){
    this.setState({ appState: state });
  }

  componentDidMount() {
    this.store.listen(this.onChange);
    this.appStore.listen(this.onAppChange);
  }

  componentWillUnmount() {
    this.store.unlisten(this.onChange);
    this.appStore.unlisten(this.onAppChange);
  }

  viewRegWidget(){
    this.actions.changeTab('register');
  }

  viewAuthWidget(){
    this.actions.changeTab('auth');
  }


  render() {
    const flux = this.props.flux;
    const state = this.state.messageBox;
    const appState = this.state.appState;

    const authWidget = (
      <div className="message-box-wrapper">
        <h1>С возвращением</h1>
        <AuthForm flux={flux} exitCallback={this.viewRegWidget}/>
      </div>
    );

    const regWidget = (
      <div className="message-box-wrapper">
        <h1>Присоединяйтесь.</h1>
        <p>Создание аккаунта позволит вам изменять рейтинг историй, оставлять коментарии и многое другое.</p>
        <RegisterForm flux={flux} exitCallback={this.viewAuthWidget} />
      </div>
    );

    const msgBoxChildren = ( state.currentTab == 'auth' ? authWidget : regWidget );
    const extraClassName = ( state.currentTab == 'auth' ? "" : "mb-register" );

    if ( appState.user ) {
      /* If user exists we don't need to show auth message box. */
      this.actions.hide.defer();
    }

    const outComponent = ( state.isDisplay && !appState.user ? (
      <MessageBox ref="auth-msg" extraClassName={extraClassName} closeMessageBox={(e)=> { this.actions.hide(); }}>
        {msgBoxChildren}
      </MessageBox>
    ) : null);

    return outComponent;
  }
}

export default AuthMessageBox;
