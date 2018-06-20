import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

const Sidebar = (props) => {
  const {
    username,
    rating,
    tags,
    authState,
    registerError,
    requestAuthAC,
    requestRegAC,
    requestLogoutAC,
  } = props;

  return (
    <div className="sidebar">
      { username ?
        <UserSidebarModule
          username={username}
          rating={rating}
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
};

Sidebar.propTypes = {
  tags: PropTypes.instanceOf(List).isRequired,
  authState: PropTypes.instanceOf(Map).isRequired,
  requestAuthAC: PropTypes.func.isRequired,
  requestRegAC: PropTypes.func.isRequired,
  requestLogoutAC: PropTypes.func.isRequired,
  username: PropTypes.string,
  rating: PropTypes.number,
  registerError: PropTypes.string,
};

export default Sidebar;
