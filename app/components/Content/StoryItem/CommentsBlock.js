import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

const drawComment = (comment, key) => (
  <div className="comment-item" key={key}>
    <div className="comment-item-head">
      <span className="comment-item-username">
        {comment.getIn(['author', 'username'])}
      </span>&nbsp;&nbsp;
      <span className="comment-date">
        {moment(comment.get('dateCreated')).format('DD MMMM в HH:mm')}
      </span>
    </div>
    <div className="comment-item-body">{comment.get('content')}</div>
    {/* <i className="comment-item-like icon-like fa " title="Мне понравилось"></i> */}
  </div>
);

class CommentsBlock extends Component {
  state = {
    message: '',
    isError: false,
  }

  handleChange = (event) => {
    const { value } = event.target;
    const isError = value.length > 400;
    this.setState({ message: value, isError });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      uID,
      appendCommentAC,
    } = this.props;
    const msg = this.state.message.trim();
    if (msg.length > 0) {
      appendCommentAC(this.props.uID, msg);
    } else {
      /* Clear all spaces */
      this.handleChange({ target: { value: '' } });
      event.target.querySelector('textarea').focus()
    }
  }

  render() {
    // TODO: move to default props
    const {
      comments = [],
      openAuthModal,
      openRegisterModal,
      user,
    } = this.props;
    const {
      isError,
    } = this.state;
    const commentsBlockState = {};
    const loadingHTML = (
      <div className="loading"><img src="/images/spinner.svg"/></div>
    );

    const commentEditorHTML = (user ? (
      <div className="comment-editor">
        <h4>Оставьте коментрий</h4>
        <form id="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <textarea placeholder="Текст коментария" value={this.state.message} onChange={this.handleChange}/>
          <button type="submit" disabled={isError} className="button comment-form-button">Отправить</button>
          {isError &&
            <div className="error">Слишком большой коментарий</div>
          }
        </form>
        {commentsBlockState.isSending ? loadingHTML : null }
      </div>
    ) : (
      <div className="comment-editor comment-login-error">
        <p>
          Чтобы оставить комментарий
          <Link to="#" onClick={openAuthModal}> войдите </Link>
           или
           <Link to="#" onClick={openRegisterModal}> зарегистрируйтесь</Link>.
        </p>
      </div>
    ));

    return (
      <div className="story-comments">
        <div id="comments">
          <div className="comments-head">Коментарии</div>
          {comments.map((comment, index) => drawComment(comment, index))}
          {commentEditorHTML}
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
