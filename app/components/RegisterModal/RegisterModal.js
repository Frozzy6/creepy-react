import React, { Component, Fragment } from 'react';

import RegisterForm from '../Common/RegisterForm';

function RegisterModal(props) {
  const {
    openDialogAC,
  } = props;

  return (
    <Fragment>
      <h1>Присоединяйтесь.</h1>
      <p>Создание аккаунта позволит вам изменять рейтинг историй, оставлять коментарии и многое другое.</p>
      <RegisterForm
        openDialogAC={openDialogAC}
      />
    </Fragment>
  )
}

export const REGISTER_MODAL_ITEM = 'REGISTER_MODAL_ITEM';

export default RegisterModal;
