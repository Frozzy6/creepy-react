import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getCurrentUserUsername } from '../../actions';

const withCurrentUserWrapper = Component => function withCurrentUser(props) {
  return (
    <Component {...props} />
  );
};

export default compose(
  connect(state => ({
    user: getCurrentUserUsername(state),
  }), {}),
  withCurrentUserWrapper,
);
