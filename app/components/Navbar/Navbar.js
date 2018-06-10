import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavItem from './NavItem';

class Navbar extends Component {
  handleAuthClick = (e) => {
    e.preventDefault();
    this.props.openDialogAC();
  }

  render() {
    const {
      location,
      isLoading,
      user,
      isAuth,
    } = this.props;

    const currentLocation = location.pathname;

    return (
      <div className="nav">
        <div className="wrap">
          <ul className="head-menu">
            <li
              className={classNames(
                'spinner',
                { hide: !isLoading },
              )}
            />
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
            { isAuth ?
              <Fragment>
                <NavItem currentLocation={currentLocation} className="submit" to="/new">
                  <i className="pencil-icon"></i>
                  Прислать историю
                </NavItem>
                <NavItem currentLocation={currentLocation} className="profile" to={`/user/${user.get('user')}`}>
                  <i title={user} className="fa fa-user-circle-o"></i>
                </NavItem>
              </Fragment> :
              <NavItem
                currentLocation={currentLocation}
                className="profile"
                onClick={this.handleAuthClick.bind(this)} to="/login">
                <i title="Войти" className="fa fa-sign-in"></i>Войти
              </NavItem>
            }
            <div style={{ clear: 'both' }}></div>
          </ul>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  openDialogAC: PropTypes.func.isRequired,
};


export default Navbar;
