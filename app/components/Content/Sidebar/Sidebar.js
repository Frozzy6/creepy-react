import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

export default function Sidebar(props){
  const {
    user,
    authState,
    requestAuthAC,
  } = props;

  const tags = ['tag1', 'tag2', 'tag3'];

  return (
    <div className="sidebar">
      { user ?
        <UserSidebarModule /> :
        <AuthSidebarModule
          authState={authState}
          requestAuthAC={requestAuthAC}
        />
      }
      <PageTagsSidebarModule
        tags={tags}
      />
    </div>
  );
}
