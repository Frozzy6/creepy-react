import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import { getLogoNumber } from '../../actions/index';
import routes from '../../routes';

import App from '../../components/App/App';

class AppContainer extends Component {
  render() {
    const {
      logoNumber,
    } = this.props;

    return (
      <App
        logoNumber={logoNumber}
      >
        {renderRoutes(routes)}
      </App>
    );
  }
}

AppContainer.propTypes = {
  logoNumber: PropTypes.number,
};

export default withRouter(connect(state => ({
  logoNumber: getLogoNumber(state),
}))(AppContainer));
