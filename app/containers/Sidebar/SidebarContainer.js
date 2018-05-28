import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  getCurrentUser,
  getAuthState,
  requestAuthAC,
} from '../../actions';

import Sidebar from '../../components/Content/Sidebar/Sidebar';

function SidebarContainer(props) {
  const {
    user,
    authState,
    requestAuthAC,
  } = props;

  return (
    <Sidebar
      requestAuthAC={requestAuthAC}
      user={user}
      authState={authState}
    />
  )
}

export default connect(
  (state) => ({
    user: getCurrentUser(state),
    authState: getAuthState(state),
  }), {
    requestAuthAC,
  })(SidebarContainer);
