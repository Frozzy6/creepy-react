import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class NavItem extends React.Component {
  constructor(props, context){
   super(props);
  }

  render(){
    const {
      to = "",
      currentLocation,
      children,
      className = ""
    } = this.props;

    let isActive = currentLocation.startsWith(to);

    return (
      <li className={className}>
        <Link
          onClick={this.props.onClick}
          className={isActive ? 'active ': ''}
          to={to}>
          {children}
        </Link>
      </li>
    )
  }
}

NavItem.propTypes = {
  currentLocation: PropTypes.string,
  className: PropTypes.string,
}


export default NavItem;
