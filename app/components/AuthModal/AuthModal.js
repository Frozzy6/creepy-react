import React, { Fragment } from 'react';

import AuthForm from '../Common/AuthForm';

const AuthModal = props => (
  <Fragment>
    <h1>С возвращением</h1>
    <AuthForm {...props} forceFocus={true} />
  </Fragment>
);

export const AUTH_MODAL_ITEM = 'AUTH_MODAL_ITEM';

export default AuthModal;
