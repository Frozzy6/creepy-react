import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

class Navbar extends Component {
  handleAuthClick = (e) => {
    e.preventDefault();
    this.props.openDialogAC();
  }

  toogleSidebar = (e) => {
    const {
      isSidebarOpen,
      openSidebarAC,
      closeSidebarAC,
    } = this.props;

    if (!isSidebarOpen) {
      openSidebarAC();
    } else {
      closeSidebarAC();
    }

    e.preventDefault();
  }

  render() {
    const {
      location,
      user,
      isAuth,
    } = this.props;

    const currentLocation = location.pathname;

    return (
      <div className="nav">
        <div className="wrap">
          <ul className="head-menu">
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
              Случайная<span className="nav-random-additional"> история</span>
            </NavItem>
            {/* Show burger menu to small devices */}
            <MediaQuery maxWidth={650}>
              <NavItem
                className="nav-burger-menu"
                onClick={this.toogleSidebar}
              >
                <i title="Меню" className="fa fa-bars"/>
              </NavItem>
            </MediaQuery>
            {/* Show expanded menu to large devices */}
            <MediaQuery minWidth={651}>
              { isAuth ?
                <Fragment>
                  {/* Submit icon */}
                  <NavItem currentLocation={currentLocation} className="submit" to="/new">
                    <i className="pencil-icon"/>
                    <span className="submit-text">Прислать историю</span>
                  </NavItem>
                  {/* Profile icon */}
                  <NavItem
                    currentLocation={currentLocation}
                    className="profile"
                    to={`/user/${user}`}
                  >
                    <i title={user} className="fa fa-user-circle-o"/>
                  </NavItem>
                </Fragment> :
                /* Login icon */
                <NavItem
                  currentLocation={currentLocation}
                  className="profile"
                  onClick={this.handleAuthClick.bind(this)}
                  to="/login"
                >
                  <i title="Войти" className="fa fa-sign-in"/>
                  <span className="profile-text">Войти</span>
                </NavItem>
              }
            </MediaQuery>
            <div style={{ clear: 'both' }}></div>
          </ul>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  openDialogAC: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  openSidebarAC: PropTypes.func.isRequired,
  closeSidebarAC: PropTypes.func.isRequired,
  user: PropTypes.string,
  isLoading: PropTypes.bool,
};

Navbar.defaultProps = {
  isLoading: false,
  user: null,
};

export default Navbar;
