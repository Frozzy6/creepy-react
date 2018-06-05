import React from 'react';
import PropTypes from 'prop-types';

import { ContentContainer } from '../containers';


const ScaryPage = (props) => {
  const { page = '1' } = props.match.params;

  return (
    <ContentContainer
      page={page}
      token="stories"
    />
  );
};

ScaryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ScaryPage;
