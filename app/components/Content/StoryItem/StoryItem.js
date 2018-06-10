import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import StoryContent from './StoryContent';
import StoryControls from './StoryControls';
import CommentsBlockContainer from '../../../containers/CommentsBlock/CommentsBlockContainer';
import withCurrentUser from '../../../containers/withCurrentUser/withCurrentUser';


class StoryItem extends Component {
  handleLike = () => {
    console.log(this.props.user);
    // if ( !this.state.app.user ) {
    //   const actions = this.flux.getActions('AuthMessageBoxActions');
    //
    //   actions.changeTab('register');
    //   return actions.show();
    // }
    //
    // const story = this.props.story;
    // this.contentActions.toggleLikeTo({uID: story.uID, shouldInc: !story.wasLiked})
  }

  render() {
    const {
      story,
      activeTag,
      verbose,
      user,
    } = this.props;

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
