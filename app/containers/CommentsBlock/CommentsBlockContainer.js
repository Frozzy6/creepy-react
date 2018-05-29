import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partial } from 'lodash';

import {
  openDialogAC,
  getCurrentUser,
  requestRegAC,
} from '../../actions';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';
import { REGISTER_MODAL_ITEM } from '../../components/RegisterModal/RegisterModal';
import CommentsBlock from '../../components/Content/StoryItem/CommentsBlock';

class CommentsBlockContainer extends Component {
  render(){
    const {
      user,
      openDialogAC,
      story,
    } = this.props;

    return (
      <CommentsBlock
        uID={story.get('uID')}
        comments={story.get('comments')}
        user={user}
        openAuthModal={partial(openDialogAC, AUTH_MODAL_ITEM)}
        openRegisterModal={partial(openDialogAC, REGISTER_MODAL_ITEM)}
      />
    )
  }
}

export default connect(
  (state) => ({
    user: getCurrentUser(state),
  }), {
    openDialogAC,
    requestRegAC,
  })(CommentsBlockContainer);
