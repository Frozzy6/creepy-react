
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  uploadAvatarImageAC,
  getUserUploadError,
  refreshUserUploadStateAC,
} from '../../actions';

import AvatarUploadModal from '../../components/AvatarUploadModal/AvatarUploadModal';

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const allowedExtensions = /(jpg|jpeg|png|gif)$/i;

const getExtension = filename => filename.split('.').slice(-1)[0];

class AvatarUploadModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      wrongSize: false,
      wrongFormat: false,
    };

    this.file = null;
  }

  handleAttached = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      return this.setState({ wrongSize: true });
    }

    if (!allowedExtensions.test(getExtension(file.name))) {
      return this.setState({ wrongFormat: true });
    }

    const fr = new FileReader();
    fr.onload = (event) => {
      this.setState({
        image: event.target.result,
        wrongSize: false,
      });
    };
    fr.readAsDataURL(file);
    this.file = file;
  }

  handleClearUpload = () => {
    const {
      netError,
      refreshUserUploadStateAC,
    } = this.props;

    if (netError) {
      refreshUserUploadStateAC();
    }
    this.setState({
      image: null,
      wrongSize: false,
    });
  };

  handleUploadClick = () => {
    const { uploadAvatarImageAC } = this.props;
    uploadAvatarImageAC(this.file);
  }

  render() {
    const {
      uploadAvatarImageAC,
      refreshUserUploadStateAC,
      netError,
    } = this.props;

    return (
      <AvatarUploadModal
        uploadAvatarImageAC={uploadAvatarImageAC}
        refreshUserUploadStateAC={refreshUserUploadStateAC}
        netError={netError}
        handleUploadClick={this.handleUploadClick}
        handleClearUpload={this.handleClearUpload}
        handleAttached={this.handleAttached}
        {...this.state}
      />
    );
  }
}


AvatarUploadModalContainer.propTypes = {
  uploadAvatarImageAC: PropTypes.func.isRequired,
  refreshUserUploadStateAC: PropTypes.func.isRequired,
  netError: PropTypes.bool.isRequired,
};

export default connect(state => ({
  netError: getUserUploadError(state),
}), {
  uploadAvatarImageAC,
  refreshUserUploadStateAC,
})(AvatarUploadModalContainer);
