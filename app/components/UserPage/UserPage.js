import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Map, List } from 'immutable';
import { Link } from 'react-router-dom';
import { isNil } from 'lodash';
import classNames from 'classnames';

import Header from './Header';

const STATUSES = [
  'В очереди на рассмотрение',
  'Отклонена',
  'В рассмотрении',
  'Опубликована',
];

const getNoPublicationsMessage = isCurrentUser => (isCurrentUser ?
  <p>Вы пока не сделали ни одной публикации</p> :
  <p>Автор пока не сделал ни одной публикации</p>
);

const getPublicationItem = (publication, isCurrentUser) => {
  // TODO: replace by dict
  const STATUS_PUBLISHED = 3;
  const uID = publication.get('uID');
  const title = publication.get('title');
  const status = publication.get('status');
  const likesCount = publication.get('likesCount');
  const commentsCount = publication.get('commentsCount');
  const isPublishedStory = status === STATUS_PUBLISHED;
  const href = (isNil(status) || status === STATUS_PUBLISHED) && `/story/${uID}`;

  return (
    <li key={uID} className="publication-item">
      <div>
        {href ?
          <Link to={href}>
            <b>{title}</b>
          </Link> :
          <div className="publication-field-title">{title}</div>
        }
      </div>
      <div className="publication-info">
        {isCurrentUser && !isPublishedStory &&
          <span
            className={classNames('publication-field-status', {
              'publication-field-status_rejected': status === 1,
            })}
          >
            {STATUSES[status]}
          </span>
        }
        { isPublishedStory &&
          <Fragment>
            <span className="publication-field-comments"><i className="fa fa-heart" /> {commentsCount}</span>
            <span className="publication-field-likes"><i className="fa fa-comments" /> {likesCount}</span>
          </Fragment>
        }
      </div>
    </li>
  );
};

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
              <h2>{isCurrentUser ? 'Ваши публикации:' : 'Публикации:'}</h2>
              <ul className="publication-list">
                {pubInfo.map(item => getPublicationItem(item, isCurrentUser))}
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
