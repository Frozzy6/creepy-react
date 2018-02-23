import React from 'react';
import NavItem from './NavItem';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    const flux = this.props.flux;

    this.appStore = flux.getStore('AppStore');
    this.msgBoxActions = flux.getActions('AuthMessageBoxActions');

    this.state = this.appStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentDidMount() {
    this.appStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleAuthClick( e ){
    e.preventDefault();

    this.msgBoxActions.changeTab('auth');
    this.msgBoxActions.show();
  }

  render() {
    var loading = this.state.loading;
    var user = this.state.user;

    const account = ( user ? (
      <NavItem className="profile" to="/my"><i title={user} className="fa fa-user-circle-o"></i></NavItem>
    ) : (
      <NavItem className="profile" onClick={this.handleAuthClick}><i title="Войти" className="fa fa-sign-in"></i>Войти</NavItem>
    ));

    const submitStory = ( user ? (
      <NavItem className="submit" to="/new"><i className="pencil-icon"></i>Прислать историю</NavItem>
    ) : null );

    return (
      <div className="nav">
        <div className="wrap">
          <ul className="head-menu">
            <li className={"spinner" + ( loading ? "" : " hide") }></li>
            <NavItem to="/stories">Новые</NavItem>
            <NavItem to="/scary">Страшные</NavItem>
            <NavItem to="/random">Случайная история</NavItem>
            {submitStory}
            {account}
            <div style={{clear:"both"}}></div>
          </ul>
        </div>
      </div>
    )
  }
}


export default Navbar;
