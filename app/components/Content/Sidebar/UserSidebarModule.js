import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserSidebarModule = ({ username, rating, requestLogoutAC }) => (
  <div className="sidebar-item sidebar-user">
    <div className="sidebar-item-body sidebar-item-body__white">
      <div className="sidebar-user-greeting">
        <Link to={`/user/${username}`}>
          <span className="bold">{username}</span>
        </Link>
        <i onClick={requestLogoutAC} title="Выйти" className="fa fa-sign-out logout"></i>
      </div>
      <ul className="user-menu-list">
        <li><i className="fa fa-star"></i>{`Рейтинг: ${rating}`}</li>
        <li><i className="fa fa-heart"></i><a href="#">Закладки</a></li>
        {/* <li><i className="fa fa-comment"></i><a href="#">Комментарии</a></li> */}
      </ul>
    </div>
  </div>
);

UserSidebarModule.propTypes = {
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  requestLogoutAC: PropTypes.func.isRequired,
};

export default UserSidebarModule;
