import React from 'react';
import PropTypes from 'prop-types';

import { SingleContentContainer } from '../containers';

const StoryPage = (props) => {
  const { id } = props.match.params;

  return (
    <SingleContentContainer
      token="story"
      id={id}
    />
  );
};

StoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StoryPage;
