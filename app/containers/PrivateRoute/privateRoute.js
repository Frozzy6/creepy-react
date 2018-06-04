import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

import { getCurrentUser } from '../../actions';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isNull(auth) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(state => ({
  user: getCurrentUser(state),
}))(PrivateRoute);
