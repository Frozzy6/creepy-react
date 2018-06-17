import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  requestAuthAC,
  getAuthState,
} from '../../actions';
import AuthModal from '../../components/AuthModal/AuthModal';
import { REGISTER_MODAL_ITEM } from '../../components/RegisterModal/RegisterModal';

const AuthModalContainer = (props) => {
  const {
    authState,
    openDialogAC,
    requestAuthAC,
  } = props;

  return (
    <AuthModal
      authState={authState}
      handleAuthClick={requestAuthAC}
      handleRegisterClick={partial(openDialogAC, REGISTER_MODAL_ITEM)}
    />
  );
};

AuthModalContainer.propTypes = {
  authState: PropTypes.instanceOf(Map).isRequired,
  openDialogAC: PropTypes.func.isRequired,
  requestAuthAC: PropTypes.func.isRequired,
};

export default connect(state => ({
  authState: getAuthState(state),
}), {
  openDialogAC,
  requestAuthAC,
})(AuthModalContainer);
