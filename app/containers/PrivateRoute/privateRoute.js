import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isNull } from 'lodash';
import { Map } from 'immutable';

import { getCurrentUser } from '../../actions';

const privateRoute = (Component, redirrectLocation = '/') => {
  const renderOrRedirect = (user, ...props) => (
    !isNull(user)
      ? <Component {...props} />
      : <Redirect to={redirrectLocation} />
  );

  const Private = ({ user, ...props }) => (
    <Route
      {...props}
      render={componentProps => renderOrRedirect(user, componentProps)}
    />
  );

  Private.propTypes = {
    user: PropTypes.instanceOf(Map),
  };

  return Private;
};

export default compose(
  connect(state => ({
    user: getCurrentUser(state),
  })),
  privateRoute,
);
