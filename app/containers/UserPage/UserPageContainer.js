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
  static state = {
    requestUser: null,
  };

  static getDerivedStateFromProps(nextProps, prevState, prevProps) {
    console.log('getDerivedStateFromProps');
    console.log(nextProps, prevState, prevProps);
  }

  render() {
    const { username } = this.props.match.params;
    const {
      currentUser,
      requestUser,
    } = this.props;

    return (
      <UserPage
        username={username}
        currentUser={currentUser}
        requestUser={requestUser}
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
  currentUser: PropTypes.instanceOf(Map),
  requestUser: PropTypes.instanceOf(Map),
};

export default connect(state => ({
  currentUser: getCurrentUser(state),
  requestUser: getRequestUser(state),
}))(UserPageContainer);
