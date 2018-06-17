import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { AUTH_MODAL_ITEM } from '../AuthModal/AuthModal';
import { REGISTER_MODAL_ITEM } from '../RegisterModal/RegisterModal';
import { AVATAR_UPLOAD_MODAL } from '../AvatarUploadModal/AvatarUploadModal';

import AuthModalContainer from '../../containers/AuthModal/AuthModalContainer';
import RegisterModalContainer from '../../containers/RegisterModal/RegisterModalContainer';
import AvatarUploadModal from '../../containers/AvatarUploadModal/AvatarUploadModalContainer';

const ModalContent = (props) => {
  const {
    closeDialogAC,
    content,
  } = props;
  let renderComponent = null;

  switch (content) {
    case AUTH_MODAL_ITEM:
      renderComponent = <AuthModalContainer />;
      break;
    case REGISTER_MODAL_ITEM:
      renderComponent = <RegisterModalContainer />;
      break;
    case AVATAR_UPLOAD_MODAL:
      renderComponent = <AvatarUploadModal />;
      break;
    default:
      renderComponent = <div>No content</div>;
  }

  return (
    <Fragment>
      <span className="message-box-close-icon">
        <svg
          onClick={closeDialogAC}
          className="svg-icon"
          width="29"
          height="29"
          viewBox="0 0 29 29">
          <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path>
        </svg>
      </span>
      <div className="message-box-wrapper">
        {renderComponent}
      </div>
    </Fragment>
  );
};

ModalContent.propTypes = {
  closeDialogAC: PropTypes.func.isRequired,
  openDialogAC: PropTypes.func.isRequired,
  content: PropTypes.string,
};

export default ModalContent;
