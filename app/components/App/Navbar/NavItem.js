import React, {PropTypes} from 'react';
import {Link, Router} from 'react-router';

class NavItem extends React.Component {
  constructor(props, context){
   super(props);
  }

  static contextTypes = {
     router: PropTypes.object.isRequired
  }

  render(){
    const { to, children } = this.props;
    const className = this.props.className || "";

    // router.isActive check full path equals,
    // but there is case needs a partical eq
    let currentLocation = this.context.router.location;
    let isActive = currentLocation.pathname.startsWith(to);
    
    return (
      <li className={className}>
        <Link onClick={this.props.onClick} className={isActive ? 'active ': ''} to={to}>{children}</Link>
      </li>
    )
  }
}


export default NavItem;
