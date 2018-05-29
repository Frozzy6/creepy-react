import React, { Component, Fragment } from 'react';
import { partial } from 'lodash';

import RegisterForm from '../Common/RegisterForm';
import { AUTH_MODAL_ITEM } from '../AuthModal/AuthModal';

function RegisterModal(props) {
  return (
    <Fragment>
      <h1>Присоединяйтесь.</h1>
      <p>Создание аккаунта позволит вам изменять рейтинг историй, оставлять коментарии и многое другое.</p>
      <RegisterForm {...props} />
    </Fragment>
  )
}

export const REGISTER_MODAL_ITEM = 'REGISTER_MODAL_ITEM';

export default RegisterModal;
