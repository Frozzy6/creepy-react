import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions';
import DialogContent from '../components/DialogContent';


const mapStateToProps = ({dialog}) => {
  const { isOpen, item = {} } = dialog;
  return { isOpen, item };
};

const mapDispatchToProps = (dispatch, props) => ({
  onRequestClose: () =>  dispatch(closeDialog())
});


const Dialog = function(props) {
    class ReduxDialog extends Component {
      render(){
        const {isOpen, ...rest} = this.props;
        return (
          <Modal isOpen={isOpen} className="app-modal">
            <DialogContent {...rest}/>
          </Modal>
        )
      }

    }

    return connect(mapStateToProps, mapDispatchToProps)(ReduxDialog)
}

export default Dialog(DialogContent);
