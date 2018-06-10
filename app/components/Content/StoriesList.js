import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import StoryItemContainer from '../../containers/StoryItem/StoryItemContainer';

class StoriesList extends React.Component {
  render() {
    const {
      stories,
    } = this.props;

    return (
      <div className={'content'}>
        {stories.size > 0 ?
          stories.map(story => (
            <StoryItemContainer
              story={story}
              key={story.get('uID')}
            />
          )) :
          <div className="panel-top">
            <h1>Ничего нет</h1>
            <p>По данной ссылке нет историй.</p>
          </div>
        }
      </div>
    );
  }
}

StoriesList.propTypes = {
  stories: PropTypes.instanceOf(List),
};

StoriesList.defaultProps = {
  stories: new List(),
};

export default StoriesList;
