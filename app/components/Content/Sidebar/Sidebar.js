import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

export default function Sidebar(props){
  const {
    user,
    tags,
    authState,
    requestAuthAC,
    requestLogoutAC,
  } = props;

  return (
    <div className="sidebar">
      { user ?
        <UserSidebarModule
          user={user}
          requestLogoutAC={requestLogoutAC}
        /> :
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
