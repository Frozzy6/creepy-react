import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

class Navbar extends Component {
  handleAuthClick( e ){
    e.preventDefault();
    this.props.openDialogAC();
  }

  render() {
    const {
      location,
      isLoading,
      user,
      openDialogAC,
    } = this.props;

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

    return (
      <div className="nav">
        <div className="wrap">
          <ul className="head-menu">
            <li className={"spinner" + ( isLoading ? "" : " hide") }></li>
            <NavItem to="/stories" currentLocation={currentLocation}>
              Новые
            </NavItem>
            <NavItem to="/scary" currentLocation={currentLocation}>
              Страшные
            </NavItem>
            <NavItem
              to="/random"
              currentLocation={currentLocation}
            >
              Случайная история
            </NavItem>
            { user ?
              <Fragment>
                <NavItem currentLocation={currentLocation} className="submit" to="/new">
                  <i className="pencil-icon"></i>
                  Прислать историю
                </NavItem>
                <NavItem currentLocation={currentLocation} className="profile" to="/my">
                  <i title={user.get('user')} className="fa fa-user-circle-o"></i>
                </NavItem>
              </Fragment> :
              <NavItem currentLocation={currentLocation} className="profile" onClick={this.handleAuthClick.bind(this)} to="/login">
                <i title="Войти" className="fa fa-sign-in"></i>Войти
              </NavItem>
            }
            <div style={{clear:"both"}}></div>
          </ul>
        </div>
      </div>
    )
  }
}


export default Navbar;
