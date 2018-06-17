import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  getCurrentUser,
  requestRegAC,
} from '../../actions';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';

class RegisterModalContainer extends Component {
  render() {
    const {
      user,
      openDialogAC,
      requestRegAC,
    } = this.props;

    return (
      <RegisterModal
        user={user}
        handleAuthClick={partial(openDialogAC, AUTH_MODAL_ITEM)}
        handleRegisterClick={requestRegAC}
      />
    );
  }
}

export default connect(state => ({
  user: getCurrentUser(state),
}), {
  openDialogAC,
  requestRegAC,
})(RegisterModalContainer);
