import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

class UserHomepage extends React.Component {
  constructor(props){
    super(props);
    const flux = this.props.flux;

    this.appActions = flux.getActions('AppActions');
    this.appStore = flux.getStore('AppStore');

    this.state = this.appStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.appStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleLogout( event ) {
    event.preventDefault();
    this.appActions.doLogout();

    this.props.router.push('/');
  }

  render() {
    let resultHTML = null;
    const user = this.state.user;

    const emptyHTML = (
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

    if ( !user ) {
      resultHTML = emptyHTML;
    } else {
      resultHTML = profileHTML;
    }

    return resultHTML;
  }
}


export default UserHomepage;
