import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ShareBlock from './ShareBlock';

const getLikeIcon = (isLikeWasSet, handleLike, likesCount) => (
  <span
    className="story_rating__container"
    onClick={handleLike}
  >
    <i
      className={classNames(
        'story_icon story_icon-like fa',
        {
          'fa-heart': isLikeWasSet,
          'fa-heart-o': !isLikeWasSet,
        },
      )}
      title="Мне понравилось"
    />
    <span className="story_rating_label">Рейтинг:&nbsp;</span>
    <span className="story_rating">{likesCount}</span>
  </span>
);

const getCommentIcon = (hasCommentsIcon, uID, commentsCount) => (hasCommentsIcon && (
  <span className="story_comments__container">
    <Link to={`/story/${uID}#comments`} className="story_comments-link">
      <i className="fa fa-comments story-comments-icon" title="Комментарии"></i>
      <span className="story_comments_label">Коментарии:&nbsp;</span>
      <span className="story_comments-count">{commentsCount}</span>
    </Link>
  </span>
));

const StoryControls = (props) => {
  const {
    handleLike,
    hasCommentsIcon,
    isLikeWasSet,
    uID,
    commentsCount,
    likesCount,
    storyTitle,
  } = props;

  return (
    <div className="story_footer">
      {getLikeIcon(isLikeWasSet, handleLike, likesCount)}
      {getCommentIcon(hasCommentsIcon, uID, commentsCount)}
      <ShareBlock uID={uID} title={storyTitle}/>
    </div>
  );
};

StoryControls.propTypes = {
  handleLike: PropTypes.func.isRequired,
  hasCommentsIcon: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  isLikeWasSet: PropTypes.bool.isRequired,
  uID: PropTypes.number.isRequired,
  storyTitle: PropTypes.string.isRequired,
  commentsCount: PropTypes.number,
};

StoryControls.defaultProps = {
  commentsCount: -1,
};

export default StoryControls;
