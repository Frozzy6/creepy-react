import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import StoryItemContainer from '../../containers/StoryItem/StoryItemContainer';

class TagContent extends Component {
  render() {
    const emptyTag = {
      description: '',
      image: null,
    };

    const {
      tag,
      stories,
      tagInfo = emptyTag,
    } = this.props;
    let storiesHTML = null;
    let imageHTML = null;

    if (stories.size > 0) {
      storiesHTML = stories.map(story =>
        <StoryItemContainer
          story={story}
          key={story.get('uID')}
          activeTag={tag}
        />);
    } else {
      storiesHTML = (
        <div className="story">
          <p> К сожалению по данному тегу ничего нет </p>
        </div>
      );
    }
    if (tagInfo.image) {
      imageHTML = (
        <div className="tag-icon-aside">
          <img src={tagInfo.image}/>
        </div>
      );
    }

    return (
      <div className="tag-content">
        <Helmet>
          <title>{tag.charAt(0).toUpperCase() + tag.slice(1) + ' - Страшные истории'}</title>
        </Helmet>
        <div className="content header">
          <h1>
            <Link className="tag-content__back-link" to="/tags/">
              Истории по теме
            </Link>:&nbsp;
            <span style={{ color: 'red' }}>
              {tag}
            </span>
          </h1>
          <div className="text">
            <p>{emptyTag.description}</p>
          </div>
        </div>
        {imageHTML}
        <div className="content">
          {storiesHTML}
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default TagContent;
