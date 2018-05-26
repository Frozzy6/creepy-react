import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'

import {
  getIsAppLoading,
  getCurrentUser,
  openDialogAC,
} from '../../actions';

import Navbar from '../../components/Navbar/Navbar';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';

class NavbarContainer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render(){
    const {
      location,
      isLoading,
      user,
      openDialogAC,
    } = this.props;

    return (
      <Navbar
        isLoading={isLoading}
        user={user}
        openDialogAC={openDialogAC.bind(null, AUTH_MODAL_ITEM)}
        location={location}
      />
    )
  }
}

export default withRouter(connect(
  (state) => ({
    isLoading: getIsAppLoading(state),
    user: getCurrentUser(state),
  }), {
    openDialogAC,
  })(NavbarContainer));
