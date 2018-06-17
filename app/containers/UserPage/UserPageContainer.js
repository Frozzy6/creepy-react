import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { partial } from 'lodash';

import {
  getCurrentUser,
  getRequestUser,
  requestUserInfo,
  requestUserPubInfo,
  getPubInfoOfUser,
  openDialogAC,
} from '../../actions';
import UserPage from '../../components/UserPage/UserPage';
import { AVATAR_UPLOAD_MODAL } from '../../components/AvatarUploadModal/AvatarUploadModal';

class UserPageContainer extends Component {
  constructor(props) {
    super(props);
    const { username } = props.match.params;

    this.props.requestUserInfo(username);
    this.props.requestUserPubInfo(username);
    this.state = {
      requestUsername: username,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { username } = nextProps.match.params;
    const { requestUsername } = prevState;
    if (username !== requestUsername) {
      nextProps.requestUserInfo(username);
      nextProps.requestUserPubInfo(username);
      return { requestUsername: username };
    }

    return null;
  }

  render() {
    const {
      currentUser,
      requestUser,
      pubInfo,
      openDialogAC,
    } = this.props;
    const { requestUsername } = this.state;

    if (!requestUser) {
      return null;
    }

    return (
      <UserPage
        requestUser={requestUser}
        isCurrentUser={currentUser === requestUsername}
        pubInfo={pubInfo}
        openDialogAC={partial(openDialogAC, AVATAR_UPLOAD_MODAL)}
      />
    );
  }
}
UserPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  currentUser: PropTypes.string,
  requestUser: PropTypes.instanceOf(Map),
  pubInfo: PropTypes.instanceOf(List).isRequired,
  requestUserInfo: PropTypes.func.isRequired,
  requestUserPubInfo: PropTypes.func.isRequired,
  openDialogAC: PropTypes.func.isRequired,
};

UserPageContainer.defaultProps = {
  requestUser: '',
};

export default connect(state => ({
  // TODO: rename to getOAuthData  and create another on method with current name
  currentUser: getCurrentUser(state),
  requestUser: getRequestUser(state),
  pubInfo: getPubInfoOfUser(state),
}), {
  requestUserInfo,
  requestUserPubInfo,
  openDialogAC,
})(UserPageContainer);
