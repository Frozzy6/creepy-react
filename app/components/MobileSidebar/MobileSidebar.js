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
        overlayClassName="mobile-sidebar-overlay"
        open={this.state.isOpen}
        onSetOpen={this.onSetOpen}
      >
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Sidebar>
    );
  }
}

export default MobileSidebar;
