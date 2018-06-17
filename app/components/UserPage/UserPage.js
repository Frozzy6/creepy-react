import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Map, List } from 'immutable';
import { Link } from 'react-router-dom';

import Header from './Header';

const getNoPublicationsMessage = isCurrentUser => (isCurrentUser ?
  <p>Вы пока не сделали ни одной публикации</p> :
  <p>Автор пока не сделал ни одной публикации</p>
);

const getPublicationItem = publication => (
  <li key={publication.get('uID')}>
    <Link to={`/story/${publication.get('uID')}`}>
      {publication.get('title')}
    </Link>
  </li>
);

class UserPage extends Component {
  handleUpload = (event) => {
    console.log(event.target.files);
    event.preventDefault();
    // this.appActions.doLogout();

    // this.props.router.push('/');
  }

  render() {
    const {
      isCurrentUser,
      requestUser,
      pubInfo,
      openDialogAC,
    } = this.props;

    return (
      <div className="wrap">
        <Helmet>
          <title>{requestUser.get('username')} профиль</title>
          <meta name='Description' content="В данном разделе отображается информация о профиле пользователя"/>
        </Helmet>
        <Header
          isCurrentUser={isCurrentUser}
          requestUser={requestUser}
          openDialogAC={openDialogAC}
        />
        <div className="content wide white padding">
          { pubInfo.size === 0 ?
            getNoPublicationsMessage(isCurrentUser) :
            <div>
              <h2>Публикации:</h2>
              <ul>
                {pubInfo.map(item => getPublicationItem(item))}
              </ul>
            </div>
          }
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  requestUser: PropTypes.instanceOf(Map).isRequired,
  pubInfo: PropTypes.instanceOf(List).isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  openDialogAC: PropTypes.func.isRequired,
};

export default UserPage;
