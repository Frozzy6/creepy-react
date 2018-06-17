import React, { Fragment } from 'react';

import RegisterForm from '../Common/RegisterForm';

const RegisterModal = props => (
  <Fragment>
    <h1>Присоединяйтесь.</h1>
    <p>Создание аккаунта позволит вам публиковать истории, изменять рейтинг историй, оставлять коментарии и многое другое.</p>
    <RegisterForm {...props} />
  </Fragment>
);

export const REGISTER_MODAL_ITEM = 'REGISTER_MODAL_ITEM';

export default RegisterModal;
