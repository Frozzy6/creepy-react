import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import moment from 'moment';
import 'moment/locale/ru';

const UserPageHeader = (props) => {
  const {
    isCurrentUser,
    requestUser,
    openDialogAC,
  } = props;
  const firstPubDate = requestUser.get('firstPubDate');

  return (
      <div className="content wide user-page--header">
        <div className="account-info">
          <div className="account-portrait">
            <img
              className="account-portrait-image account-portrait-question"
              src="/images/question-sign.svg"
            />
            {isCurrentUser &&
              <div
                className="account-portrait--upload-btn"
                onClick={openDialogAC}>
                Загрузить
              </div>
            }
          </div>
        </div>
        <div className="user-page--header-description">
          <h1>{requestUser.get('username')}</h1>
          <p>
            <i className="fa fa-star"/>
            Рейтинг: {requestUser.get('rating')}
          </p>
          <p>
            <i className="fa fa-clock-o"/>
            Дата регистрации: {moment(requestUser.get('dateRegister')).format('DD MMMM YYYY')}
          </p>
          {firstPubDate &&
            <p>
              <i className="fa fa-book"/>
              Первая публикация: {moment(firstPubDate).format('DD MMMM YYYY')}
            </p>
          }
        </div>
      </div>
  );
};


UserPageHeader.propTypes = {
  requestUser: PropTypes.instanceOf(Map).isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  openDialogAC: PropTypes.func.isRequired,
};

export default UserPageHeader;
