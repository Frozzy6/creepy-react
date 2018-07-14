import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

import Sidebar from '../Common/Sidebar';

class MobileSidebar extends Component {
  state = {
    isOpen: false,
  }

  onSetOpen = (isOpen) => {
    console.log(isOpen);
    this.setState({ isOpen });
  }

  render() {
    return (
      <Sidebar
        rootClassName="mobile-sidebar"
        sidebarClassName="mobile-sidebar-presentation"
        open={this.state.isOpen}
        onSetOpen={this.onSetOpen}
      >
        test
        Middlewared
        aw
        da
        wd
        Object.assign(wd
      </Sidebar>
    );
  }
}

export default MobileSidebar;
