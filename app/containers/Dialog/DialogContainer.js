import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import classNames from 'classnames';

import {
  getDialogIsOpen,
  getDialogContent,
  closeDialogAC,
  openDialogAC,
} from '../../actions';
import ModalContent from '../../components/ModalContent/ModalContent';
import { REGISTER_MODAL_ITEM } from '../../components/RegisterModal/RegisterModal';

class ReduxDialog extends Component {
  render() {
    const {
      isOpen,
      closeDialogAC,
      content,
      ...rest
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        className={
          classNames('message-box',
            { 'mb-register': content === REGISTER_MODAL_ITEM })}
        overlayClassName='overlay overlay-dark'
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeDialogAC}
      >
        <ModalContent
          content={content}
          closeDialogAC={closeDialogAC}
          {...rest}
        />
      </Modal>
    );
  }
}

export default connect(
  state => ({
    isOpen: getDialogIsOpen(state),
    content: getDialogContent(state),
  }), {
    closeDialogAC,
    openDialogAC,
  },
)(ReduxDialog);
