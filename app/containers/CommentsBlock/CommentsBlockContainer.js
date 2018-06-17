import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  getCurrentUser,
  requestRegAC,
  appendCommentAC,
} from '../../actions';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';
import { REGISTER_MODAL_ITEM } from '../../components/RegisterModal/RegisterModal';
import CommentsBlock from '../../components/Content/StoryItem/CommentsBlock';

class CommentsBlockContainer extends Component {
  render() {
    const {
      user,
      openDialogAC,
      appendCommentAC,
      story,
    } = this.props;

    return (
      <CommentsBlock
        uID={story.get('uID')}
        comments={story.get('comments')}
        user={user}
        openAuthModal={partial(openDialogAC, AUTH_MODAL_ITEM)}
        openRegisterModal={partial(openDialogAC, REGISTER_MODAL_ITEM)}
        appendCommentAC={appendCommentAC}
      />
    );
  }
}

CommentsBlockContainer.propTypes = {
  user: PropTypes.string,
  openDialogAC: PropTypes.func.isRequired,
  appendCommentAC: PropTypes.func.isRequired,
  story: PropTypes.instanceOf(Map),
};

export default connect(state => ({
  user: getCurrentUser(state),
}), {
  openDialogAC,
  requestRegAC,
  appendCommentAC,
})(CommentsBlockContainer);
