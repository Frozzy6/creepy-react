import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  const {
    logoNumber,
  } = props;

  return (
    <div className="top">
      <div className="wrap header">
        <Link to="/" title="Страшные истории">
          <img className="scary-label" src="/images/logo.png"/>
        </Link>
        <Link to="#">
          <img src={`/images/lg/${logoNumber}.png`} className="ghost-logo"/>
        </Link>
      </div>
    </div>
  );
};

Logo.propTypes = {
  logoNumber: PropTypes.number.isRequired,
};

export default Logo;
