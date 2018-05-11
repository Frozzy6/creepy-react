import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

class Sidebar extends React.Component {
  render(){
    // const tags = this.props.sidebarTags;
    const sidebarBlocks = [];

    if ( appState.user ) {
      sidebarBlocks.push( <UserSidebarModule key="1"/> )
    } else {
      sidebarBlocks.push( <AuthSidebarModule key="1"/> )
    }

    // sidebarBlocks.push( <PageTagsSidebarModule sidebarTags={tags} key="2"/>)

    return (
      <div className="sidebar" ref="sidebar">
        {sidebarBlocks}
      </div>
    );
  };
}

export default Sidebar;
