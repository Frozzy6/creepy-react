import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import NavItem from './NavItem';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    // const flux = this.props.flux;
    this.state = {};
    // this.appStore = flux.getStore('AppStore');
    // this.msgBoxActions = flux.getActions('AuthMessageBoxActions');
    //
    // this.state = this.appStore.getState();
    // this.onChange = this.onChange.bind(this);
    // this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // this.appStore.listen(this.onChange);
  }

  componentWillUnmount() {
    // this.appStore.unlisten(this.onChange);
  }

  onChange(state) {
    // this.setState(state);
  }

  handleAuthClick( e ){
    e.preventDefault();

    // this.msgBoxActions.changeTab('auth');
    // this.msgBoxActions.show();
  }

  render() {
    const {
      location,
    } = this.props;

    const loading = this.state.loading || false;
    const user = this.state.user;
    const currentLocation = location.pathname;

    const account = ( user ? (
      <NavItem currentLocation={currentLocation} className="profile" to="/my">
        <i title={user} className="fa fa-user-circle-o"></i>
      </NavItem>
    ) : (
      <NavItem currentLocation={currentLocation} className="profile" onClick={this.handleAuthClick} to="/login">
        <i title="Войти" className="fa fa-sign-in"></i>Войти
      </NavItem>
    ));

    const submitStory = ( user ? (
      <NavItem className="submit" to="/new"><i className="pencil-icon"></i>Прислать историю</NavItem>
    ) : null );

    return (
      <div className="nav">
        <div className="wrap">
          <ul className="head-menu">
            <li className={"spinner" + ( loading ? "" : " hide") }></li>
            <NavItem to="/stories" currentLocation={currentLocation}>
              Новые
            </NavItem>
            <NavItem to="/scary" currentLocation={currentLocation}>
              Страшные
            </NavItem>
            <NavItem to="/random" currentLocation={currentLocation}>Случайная история</NavItem>
            {submitStory}
            {account}
            <div style={{clear:"both"}}></div>
          </ul>
        </div>
      </div>
    )
  }
}


export default withRouter(Navbar);
