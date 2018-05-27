import React, { Fragment } from 'react'
import { partial } from 'lodash';

import AuthModal, { AUTH_MODAL_ITEM } from '../AuthModal/AuthModal';
import RegisterModal, { REGISTER_MODAL_ITEM } from '../RegisterModal/RegisterModal';

export default function ModalContent(props){
  const {
    closeDialogAC,
    openDialogAC,
    content,
  } = props;
  let renderComponent = null;

  switch (content) {
    case AUTH_MODAL_ITEM:
      renderComponent = <AuthModal
        handleRegisterClick={partial(openDialogAC, REGISTER_MODAL_ITEM)}
      />
      break;
    case REGISTER_MODAL_ITEM:
      renderComponent = <RegisterModal
        handleAuthClick={partial(openDialogAC, AUTH_MODAL_ITEM)}
      />
      break;
    default:
      renderComponent = (<div>No content</div>)
  }

  return (
    <Fragment>
      <span className="message-box-close-icon"><svg onClick={closeDialogAC} className="svg-icon" width="29" height="29" viewBox="0 0 29 29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path></svg></span>
      <div className="message-box-wrapper">
        {renderComponent}
      </div>
    </Fragment>
  )
}
