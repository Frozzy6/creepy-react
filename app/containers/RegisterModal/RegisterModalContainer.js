import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  getCurrentUserUsername,
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

RegisterModalContainer.propTypes = {
  user: PropTypes.shape({}).isRequired,
  openDialogAC: PropTypes.func.isRequired,
  requestRegAC: PropTypes.func.isRequired,
};

export default connect(state => ({
  user: getCurrentUserUsername(state),
}), {
  openDialogAC,
  requestRegAC,
})(RegisterModalContainer);
