import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

const EmptyCommentsComponent = ({ message }) => (
  <div className="comment-message">
    <div className="comment-item-body">{message}</div>
  </div>
);

EmptyCommentsComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

// TODO: one class per file
class CommentItem extends Component {
  render() {
    const { comment } = this.props;
    const author = comment.get('author');
    if (!author) {
      console.error('No comment author', console.log(comment.toJS()));
    }

    return (
      <div className="comment-item">
        <div className="comment-item-head">
          <span className="comment-item-username">
            {comment.author ? comment.author.username : 'bad' }
          </span>&nbsp;&nbsp;<span style={{ color: "#999", fontSize: "80%" }}>
            {moment(comment.get('dateCreated')).format('DD MMMM в HH:mm')}
          </span>
        </div>
        <div className="comment-item-body">{comment.get('content')}</div>
        {/* <i className="comment-item-like icon-like fa " title="Мне понравилось"></i> */}
      </div>
    );
  }
}

class CommentsBlock extends Component {
  state = {
    message: '',
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ message: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const msg = this.state.commentsBlockState.message.trim();
    if (msg.length > 0) {
      this.commentsBlockActions.postComment(this.props.uID, msg);
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

    const commentsBlockState = {};

    const commentsComponent = comments.map((comment, index) => (
      <CommentItem comment={comment} key={index} />
    ));

    const loadingHTML = (
      <div className="loading"><img src="/images/spinner.svg"/></div>
    );

    // todo: check auth
    const commentEditorHTML = (user ? (
      <div className="comment-editor">
        <h4>Оставьте коментрий</h4>
        <form id="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <textarea placeholder="Текст коментария" value={this.state.message} onChange={this.handleChange}/>
          <button type="submit" className="button comment-form-button">Отправить</button>
        </form>
        {commentsBlockState.isSending ? loadingHTML : null }
      </div>
    ) : (
      <div className="comment-editor comment-login-error">
        <p>Чтобы оставить комментарий <Link to="#" onClick={openAuthModal}>войдите</Link> или <Link to="#" onClick={openRegisterModal}>зарегистрируйтесь</Link>.</p>
      </div>
    ));

    return (
      <div className="story-comments">
        <div id="comments">
          <div className="comments-head">Коментарии</div>
          {commentsComponent}
          {commentEditorHTML}
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
