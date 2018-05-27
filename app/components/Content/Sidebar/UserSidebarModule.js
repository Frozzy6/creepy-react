import React from 'react';
import {Link} from 'react-router';

class UserSidebarModule extends React.Component {
  constructor( props ){
    super(props);

    this.state = {};
  }

  render(){
    return (
      <div className="sidebar-item sidebar-user" ref="userSidebarPanel">
        <div className="sidebar-item-body sidebar-item-body__white">
          <div className="sidebar-user-greeting">
            <span className="bold">Username</span>
            <i onClick={this.handleLogout} title="Выйти" className="fa fa-sign-out logout"></i>
          </div>
          <ul className="user-menu-list">
            <li><i className="fa fa-star"></i>Рейтинг: 0</li>
            <li><i className="fa fa-heart"></i><a href="#">Оценки</a></li>
            <li><i className="fa fa-comment"></i><a href="#">Комментарии</a></li>
          </ul>
        </div>
      </div>
    )
  }

  handleLogout( event ) {
    event.preventDefault();
    this.appActions.doLogout();
  }
}

export default UserSidebarModule;
