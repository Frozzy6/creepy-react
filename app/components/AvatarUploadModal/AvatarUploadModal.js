import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MAX_FILE_SIZE = 1024 * 1024;

class AvatarUploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      wrongSize: false,
    };

    this.file = null;
  }

  handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      return this.setState({ wrongSize: true });
    }

    const fr = new FileReader();
    fr.onload = (event) => {
      this.setState({
        image: event.target.result,
        wrongSize: false,
      });
    };
    fr.readAsDataURL(file);
    this.file = file;
  }

  handleClearUpload = () => {
    this.setState({
      image: null,
      wrongSize: false,
    });
  };

  handleUploadClick = () => {
    const { uploadAvatarImageAC } = this.props;
    uploadAvatarImageAC(this.file);
  }

  render() {
    const {
      image,
      wrongSize,
    } = this.state;

    return (
      <div className="upload-avatar-modal">
        <h1>Загрузка файла</h1>
        <div className="upload-avatar--placeholder">
          { image &&
            <img
              className="upload-avatar--image-preload"
              src={image}
            />
          }
        </div>
        <p>Вы можете загрузить изображение на аватар:</p>
        <ul className="image-requirement">
          <li>Не больше, чем 1 мб</li>
        </ul>
          { image ?
            <div className="resolve-btn-wrapper">
              <button className="button danger" onClick={this.handleClearUpload}>Отменить</button>
              <button className="button" onClick={this.handleUploadClick}>Отправить</button>
            </div> :
            <div className="upload-btn-wrapper">
              <button className="button">Загрузить</button>
              <input type="file" name="avatar" onChange={this.handleUpload}/>
            </div>
          }
        {wrongSize &&
          <div className="upload-errors">
            <p>Выбранный файл больше, чем 2мб.</p>
          </div>
        }
      </div>
    );
  }
}

AvatarUploadModal.propTypes = {
  uploadAvatarImageAC: PropTypes.func.isRequired,
};

export const AVATAR_UPLOAD_MODAL = 'AVATAR_UPLOAD_MODAL';

export default AvatarUploadModal;
