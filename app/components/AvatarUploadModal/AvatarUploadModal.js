import React from 'react';
import PropTypes from 'prop-types';

const AvatarUploadModal = props => (
  <div className="upload-avatar-modal">
    <h1>Загрузка файла</h1>
    <div className="upload-avatar--placeholder">
      { props.image
        && <img
          className="upload-avatar--image-preload"
          src={props.image}
        />
      }
    </div>
    <p>Вы можете загрузить изображение на аватар:</p>
    <ul className="image-requirement">
      <li>Не больше, чем 1 мб</li>
    </ul>
      { props.image
        ? <div className="resolve-btn-wrapper">
          <button className="button" disabled={props.netError} onClick={props.handleUploadClick}>Отправить</button>
          <button className="button danger" onClick={props.handleClearUpload}>Отменить</button>
        </div>
        : <div className="upload-btn-wrapper">
          <button className="button">Загрузить</button>
          <input type="file" name="avatar" accept="image/*" onChange={props.handleAttached}/>
        </div>
      }
    <div className="upload-errors">
    {props.wrongSize
      && <p>Выбранный файл больше, чем 1мб.</p>
    }
    {props.wrongFormat
      && <p>Выбранный файл не является изображением.</p>
    }
    </div>
    {props.netError
      && <div className="upload-errors">
        <p>Во время выполнения запроса произошла ошибка</p>
      </div>
    }
  </div>
);

AvatarUploadModal.propTypes = {
  refreshUserUploadStateAC: PropTypes.func.isRequired,
  uploadAvatarImageAC: PropTypes.func.isRequired,
  netError: PropTypes.bool.isRequired,
  wrongSize: PropTypes.bool.isRequired,
  wrongFormat: PropTypes.bool.isRequired,
  image: PropTypes.shape({}),
  handleAttached: PropTypes.func.isRequired,
  handleClearUpload: PropTypes.func.isRequired,
  handleUploadClick: PropTypes.func.isRequired,
};

export const AVATAR_UPLOAD_MODAL = 'AVATAR_UPLOAD_MODAL';

export default AvatarUploadModal;
