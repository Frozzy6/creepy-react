import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {
  getIsAppLoading,
  isUserAuthorized,
  openDialogAC,
  getCurrentUserUsername,
} from '../../actions';

import Navbar from '../../components/Navbar/Navbar';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';

const NavbarContainer = (props) => {
  const {
    location,
    isLoading,
    isAuth,
    user,
  } = props;

  return (
    <Navbar
      isLoading={isLoading}
      user={user}
      isAuth={isAuth}
      openDialogAC={props.openDialogAC.bind(null, AUTH_MODAL_ITEM)}
      location={location}
    />
  );
};

NavbarContainer.propTypes = {
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  openDialogAC: PropTypes.func.isRequired,
  user: PropTypes.string,
};

NavbarContainer.defaultProps = {
  user: null,
};

export default withRouter(connect(state => ({
  isLoading: getIsAppLoading(state),
  isAuth: isUserAuthorized(state),
  user: getCurrentUserUsername(state),
}), {
  openDialogAC,
})(NavbarContainer));
