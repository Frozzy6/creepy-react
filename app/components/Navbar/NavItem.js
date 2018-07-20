import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

function NavItem(props) {
  const {
    to,
    currentLocation,
    children,
    className,
  } = props;

  const isActive = currentLocation && currentLocation.startsWith(to);

  return (
    <li className={className}>
      <Link
        onClick={props.onClick}
        className={classNames(
          className,
          { active: isActive },
        )}
        to={to}>
        {children}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  currentLocation: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  className: null,
  currentLocation: null,
  to: '/',
  onClick: () => {},
};


export default NavItem;
