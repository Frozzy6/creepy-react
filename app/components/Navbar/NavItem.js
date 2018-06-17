import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function NavItem(props){
  const {
    to = "",
    currentLocation = "",
    children,
    className = "",
  } = props;

  let isActive = currentLocation.startsWith(to);

  return (
    <li className={className}>
      <Link
        onClick={props.onClick}
        className={isActive ? 'active ': ''}
        to={to}>
        {children}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  currentLocation: PropTypes.string,
  className: PropTypes.string,
}


export default NavItem;
