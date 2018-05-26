import React, { Component, Fragment } from 'react';

import AuthForm from '../Common/AuthForm';

function AuthModal(props){
  const {
    openDialogAC,
  } = props;

  return (
    <Fragment>
      <h1>С возвращением</h1>
      <AuthForm
        openDialogAC={openDialogAC}
      />
    </Fragment>
  );
}

export const AUTH_MODAL_ITEM = 'AUTH_MODAL_ITEM';

export default AuthModal;
