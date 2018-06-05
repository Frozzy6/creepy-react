import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class UserPage extends Component {
  handleLogout(event) {
    event.preventDefault();
    // this.appActions.doLogout();

    // this.props.router.push('/');
  }

  render() {
    const {
      currentUser,
      username,
    } = this.props;

    return (
      <div className="wrap">
        <Helmet>
          <title>Мой профиль</title>
          <meta name='Description' content="В данном разделе отображается информация о профиле пользователя"/>
        </Helmet>
        <div className="content wide white padding">
          Чтобы увидеть информацию о своем профиле необходимо войти, либо зарегистрироваться.
        </div>
      </div>
    );

    const profileHTML = (
      <div className="wrap">
        <Helmet>
          <title>Мой профиль</title>
          <meta name='Description' content="В данном разделе отображается информация о профиле пользователя"/>
        </Helmet>
        <div className="message message-info">
          <i className="fa fa-info-circle"></i>
          В текущее время данный развел находится в разработке.
        </div>
        <div className="content wide white padding homepage">
          <h1>{user}</h1>
          <ul className="user-menu-list">
            <li><i className="fa fa-star"></i>Рейтинг: 0</li>
            <li><i className="fa fa-heart"></i><a href="#">Оценки</a></li>
            <li><i className="fa fa-comment"></i><a href="#">Комментарии</a></li>
            <li><i className="fa fa-sign-out"></i><a onClick={this.handleLogout}>Выйти</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Map),
};

UserPage.defaultProps = {
  user: null,
};

export default UserPage;
