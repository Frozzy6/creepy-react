import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  getCurrentUser,
  getAuthState,
  getTagsPerPage,
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
  getRegisterError,
} from '../../actions';
import Sidebar from '../../components/Content/Sidebar/Sidebar';

const SidebarContainer = (props) => (
  <Sidebar {...props} />
);

export default connect(state => ({
  user: getCurrentUser(state),
  authState: getAuthState(state),
  tags: getTagsPerPage(state),
  registerError: getRegisterError(state),
}), {
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
})(SidebarContainer);
