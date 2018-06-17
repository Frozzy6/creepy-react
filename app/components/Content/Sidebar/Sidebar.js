import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

export default function Sidebar(props) {
  const {
    user,
    tags,
    authState,
    registerError,
    requestAuthAC,
    requestRegAC,
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
          registerError={registerError}
          requestAuthAC={requestAuthAC}
          requestRegAC={requestRegAC}
        />
      }
      <PageTagsSidebarModule
        tags={tags}
      />
    </div>
  );
}
