import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uploadAvatarImageAC } from '../../actions';

import AvatarUploadModal from '../../components/AvatarUploadModal/AvatarUploadModal';

const AvatarUploadModalContainer = props => (
  <AvatarUploadModal
    uploadAvatarImageAC={props.uploadAvatarImageAC}
  />
);

AvatarUploadModalContainer.propTypes = {
  uploadAvatarImageAC: PropTypes.func.isRequired,
};

export default connect(null, {
  uploadAvatarImageAC,
})(AvatarUploadModalContainer);
