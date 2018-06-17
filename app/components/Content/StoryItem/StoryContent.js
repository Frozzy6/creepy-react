import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import moment from 'moment';
import 'moment/locale/ru';

import TagItem from './TagItem';

const StoryContent = (props) => {
  const { story, activeTag } = props;
  const uID = story.get('uID');
  const content = story.get('content');
  const title = story.getIn(['data', 'title']);
  const author = story.getIn(['author', 'username']);
  const datePublished = moment(story.get('datePublished')).format('DD MMMM YYYY в HH:mm');
  let tags = story.get('tags') || [];

  tags = tags.map((tag, index) => {
    const active = tag === activeTag;
    return <TagItem tag={tag} key={index} active={active}/>;
  });

  return (
    <div className="story">
      <div className="story__heading">
        <span className="story-icon"/>
        <div className="story__heading--information">
          <h2><Link to={`/story/${uID}`}>{title}</Link></h2>
          <div>
            <div className="publish-date">{datePublished}</div>
            <div className="author-name">
              <img className="author-icon" src="/images/author-icon.png"/>
              <Link to={`/user/${author}`}>
                {author}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ul className="tags">{tags}</ul>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

StoryContent.propTypes = {
  story: PropTypes.instanceOf(Map).isRequired,
  activeTag: PropTypes.string,
};

StoryContent.defaultProps = {
  activeTag: '',
};

export default StoryContent;
