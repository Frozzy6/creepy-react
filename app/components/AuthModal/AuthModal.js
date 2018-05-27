import React, { Component, Fragment } from 'react';
import { partial } from 'lodash';

import AuthForm from '../Common/AuthForm';

function AuthModal(props){
  const {
    handleRegisterClick,
  } = props;

  return (
    <Fragment>
      <h1>С возвращением</h1>
      <AuthForm
        handleRegisterClick={handleRegisterClick}
      />
    </Fragment>
  );
}

export const AUTH_MODAL_ITEM = 'AUTH_MODAL_ITEM';

export default AuthModal;
