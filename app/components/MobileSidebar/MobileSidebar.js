import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Sidebar from '../Common/Sidebar';

class MobileSidebar extends Component {
  onSetOpen = (nextSidebarState) => {
    const { openSidebarAC, closeSidebarAC } = this.props;
    if (nextSidebarState) {
      openSidebarAC();
    } else {
      closeSidebarAC();
    }
  }

  handleClickLink = () => {
    this.props.closeSidebarAC();
  }

  handleLoginClick = () => {
    this.props.closeSidebarAC();
    this.props.openDialogAC();
  }

  render() {
    const {
      isUserAuthorized,
      user,
    } = this.props;

    return (
      <Sidebar
        rootClassName="mobile-sidebar"
        sidebarClassName="mobile-sidebar-presentation"
        overlayClassName="mobile-sidebar-overlay"
        open={this.props.isOpen}
        onSetOpen={this.onSetOpen}
      >
        <div className="sidebar-menu">
          {isUserAuthorized ?
            <Fragment>
              <hr/>
              <Link to={`/user/${user}`} className="sidebar-menu-item" onClick={this.handleClickLink}>
                <i className="fa fa-user-circle-o"></i>
                Мой профиль
              </Link>
              <hr/>
              <Link to="/" className="sidebar-menu-item">
                <i className="fa fa-pencil"></i>
                Прислать историю
              </Link>
              <hr/>

              <hr className="divider-gap"/>
              <Link to="/" className="sidebar-menu-item sidebar-menu-item_last">
                <i title="Выйти" className="fa fa-sign-out"></i>
                Выйти
              </Link>
              <hr/>
            </Fragment>
          :
          <Fragment>
            <hr/>
            <Link to="/" className="sidebar-menu-item" onClick={this.handleLoginClick}>
              <i className="fa fa-sign-in"></i>
              Войти
            </Link>
            <hr/>
          </Fragment>
          }
        </div>
      </Sidebar>
    );
  }
}

MobileSidebar.propTypes = {
  openSidebarAC: PropTypes.func.isRequired,
  closeSidebarAC: PropTypes.func.isRequired,
  openDialogAC: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isUserAuthorized: PropTypes.bool.isRequired,
  user: PropTypes.string,
};

MobileSidebar.defaultProps = {
  user: null,
};

export default MobileSidebar;
