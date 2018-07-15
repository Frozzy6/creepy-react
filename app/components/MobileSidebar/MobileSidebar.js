import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    return (
      <Sidebar
        rootClassName="mobile-sidebar"
        sidebarClassName="mobile-sidebar-presentation"
        overlayClassName="mobile-sidebar-overlay"
        open={this.props.isOpen}
        onSetOpen={this.onSetOpen}
      >
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Sidebar>
    );
  }
}

MobileSidebar.propTypes = {
  openSidebarAC: PropTypes.func.isRequired,
  closeSidebarAC: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default MobileSidebar;
