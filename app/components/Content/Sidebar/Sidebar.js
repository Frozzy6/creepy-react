import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

export default function Sidebar(props){
  const {
    requestAuthAC,
  } = props;

  const tags = ['tag1', 'tag2', 'tag3'];

  return (
    <div className="sidebar">
      { false ?
        <UserSidebarModule /> :
        <AuthSidebarModule
          requestAuthAC={requestAuthAC}
        />
      }
      <PageTagsSidebarModule
        tags={tags}
      />
    </div>
  );
}
