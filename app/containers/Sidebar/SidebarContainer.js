import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
  requestAuthAC,
} from '../../actions';

import Sidebar from '../../components/Content/Sidebar/Sidebar';

function SidebarContainer(props) {
  return (
    <Sidebar
      requestAuthAC={requestAuthAC}
    />
  )
}

export default connect(
  (state) => ({
  }), {
    requestAuthAC,
  })(SidebarContainer);
