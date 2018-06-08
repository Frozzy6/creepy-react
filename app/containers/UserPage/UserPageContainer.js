import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import {
  getCurrentUser,
  getRequestUser,
} from '../../actions';
import UserPage from '../../components/UserPage/UserPage';

class UserPageContainer extends Component {
  state = {
    requestUser: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { username } = nextProps.match.params;
    if (username === prevState.requestUser) {
      // TODO: request user data
      return {
        requestUser: username,
      };
    }

    return null;
  }

  render() {
    const { username } = this.props.match.params;
    const {
      oauth,
      requestUser,
    } = this.props;
    return (
      <UserPage
        username={username}
        requestUser={requestUser}
        isCurrentUser={oauth.get('user') === requestUser}
      />
    );
  }
}
UserPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  oauth: PropTypes.instanceOf(Map),
  requestUser: PropTypes.instanceOf(Map),
};

export default connect(state => ({
  // TODO: rename to getOAuthData  and create another on method with current name
  oauth: getCurrentUser(state) || new Map(),
  requestUser: getRequestUser(state),
}))(UserPageContainer);
