import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  requestAuthAC,
  getAuthState,
  getCurrentUser,
} from '../../actions';
import AuthModal from '../../components/AuthModal/AuthModal';
import { REGISTER_MODAL_ITEM } from '../../components/RegisterModal/RegisterModal';

class AuthModalContainer extends Component {
  render(){
    const {
      user,
      authState,
      openDialogAC,
      requestAuthAC,
    } = this.props;

    return (
      <AuthModal
        authState={authState}
        handleAuthClick={requestAuthAC}
        handleRegisterClick={partial(openDialogAC, REGISTER_MODAL_ITEM)}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: getCurrentUser(state),
    authState: getAuthState(state),
  }), {
    openDialogAC,
    requestAuthAC,
  })(AuthModalContainer);
