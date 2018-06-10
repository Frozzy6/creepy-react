import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import StoryContent from './StoryContent';
import StoryControls from './StoryControls';
import CommentsBlockContainer from '../../../containers/CommentsBlock/CommentsBlockContainer';
import withCurrentUser from '../../../containers/withCurrentUser/withCurrentUser';
import { AUTH_MODAL_ITEM } from '../../AuthModal/AuthModal';

class StoryItem extends Component {
  handleLike = () => {
    const {
      isAuth,
      requestLikeAC,
      requestDislikeAC,
      openDialogAC,
      story,
    } = this.props;

    const uID = story.get('uID');
    const isLikeWasSet = story.get('wasLiked') || false;

    if (!isAuth) {
      return openDialogAC(AUTH_MODAL_ITEM);
    }

    if (!isLikeWasSet) {
      requestLikeAC(uID);
    } else {
      requestDislikeAC(uID);
    }
  }

  render() {
    const {
      story,
      activeTag,
      verbose,
    } = this.props;

    if (!story) {
      return null;
    }

    const isLikeWasSet = story.get('wasLiked') || false;
    const uID = story.get('uID');
    const commentsCount = story.get('commentsCount');
    const likesCount = story.get('likesCount');
    const storyTitle = story.getIn(['data', 'title']);

    return (
      <div className="story-item">
        <StoryContent
          story={story}
          activeTag={activeTag}
        />
        <StoryControls
          handleLike={this.handleLike}
          hasCommentsIcon={!verbose}
          isLikeWasSet={isLikeWasSet}
          uID={uID}
          commentsCount={commentsCount}
          likesCount={likesCount}
          storyTitle={storyTitle}
        />
        { verbose &&
          <CommentsBlockContainer
            story={story}
          />
        }
      </div>
    );
  }
}

StoryItem.propTypes = {
  story: PropTypes.instanceOf(Map).isRequired,
  isAuth: PropTypes.bool.isRequired,
  requestLikeAC: PropTypes.func.isRequired,
  requestDislikeAC: PropTypes.func.isRequired,
  openDialogAC: PropTypes.func.isRequired,
  user: PropTypes.string,
  activeTag: PropTypes.string,
  verbose: PropTypes.bool,
};

StoryItem.defaultProps = {
  activeTag: null,
  verbose: false,
  user: null,
};

export default withCurrentUser(StoryItem);
