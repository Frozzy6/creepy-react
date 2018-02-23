import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import 'moment/locale/ru';

const EmptyCommentsComponent = (props) =>  (
  <div className="comment-message">
    <div className="comment-item-body">{props.message}</div>
  </div>
);

class CommentItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const comment = this.props.comment;
    if ( !comment.author ) {
      console.log('BAD!!!', console.log(comment));
    }

    return (
      <div className="comment-item">
        <div className="comment-item-head"><span className="comment-item-username">{comment.author ? comment.author.username : 'bad' }</span>&nbsp;&nbsp;<span style={{color: "#999", fontSize: "80%"}} >{moment(comment.dateCreated).format('DD MMMM в HH:mm')}</span></div>
        <div className="comment-item-body">{comment.content}</div>
        {/* <i className="comment-item-like icon-like fa " title="Мне понравилось"></i> */}
      </div>
    );
  }
}

class CommentsBlock extends React.Component {
  constructor(props){
    super(props)

    const flux = this.props.flux;
    const comments = this.props.comments;

    this.flux = this.props.flux;

    this.appStore = this.flux.getStore('AppStore');
    this.commentsBlockActions = this.flux.getActions('CommentsBlockActions');
    this.commentsBlockStore = this.flux.getStore('CommentsBlockStore');

    this.state = {
      appState: this.appStore.getState(),
      commentsBlockState: this.commentsBlockStore.getState()
    };

    this.onChange = this.onChange.bind(this);
    this.onAppChange = this.onAppChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentDidMount() {
    this.appStore.listen(this.onAppChange);
    this.commentsBlockStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onAppChange);
    this.commentsBlockStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({commentsBlockState: state});
  }

  onAppChange(appState){
    if ( this.refs.commentsBlock ) {
      this.setState({appState:appState})
    }
  }

  handleChange( event ) {
    this.commentsBlockActions.updateData( event.target.value );
  }

  handleSubmit( event ){
    event.preventDefault();
    const msg = this.state.commentsBlockState.message.trim();
    if ( msg.length > 0 ) {
      this.commentsBlockActions.postComment( this.props.uID, msg );
    } else {
      /* Clear all spaces */
      this.handleChange({target:{ value: "" }});
      event.target.querySelector('textarea').focus()
    }
  }

  handleRegisterClick( e ){
    e.preventDefault();
    const actions = this.flux.getActions('AuthMessageBoxActions');

    actions.changeTab('register');
    actions.show();
  }

  handleAuthClick( e ){
    e.preventDefault();
    const actions = this.flux.getActions('AuthMessageBoxActions');

    actions.changeTab('auth');
    actions.show();
  }

  render(){
    const appState = this.state.appState;
    const commentsBlockState = this.state.commentsBlockState;
    let commentsComponent = this.props.comments.map( (comment, index ) => ( <CommentItem comment={comment} key={index} /> ));

    const loadingHTML = (
      <div className="loading"><img src="/images/spinner.svg"/></div>
    );

    const commentEditorHTML = ( appState.user ? (
      <div className="comment-editor">
        <h4>Оставьте коментрий</h4>
        <form id="comment-form" onSubmit={this.handleSubmit.bind(this)}>
          <textarea placeholder="Текст коментария" value={this.state.commentsBlockState.message} onChange={this.handleChange}/>
          <button type="submit" className="button comment-form-button">Отправить</button>
        </form>
        {commentsBlockState.isSending ? loadingHTML : null }
      </div>
    ) : (
      <div className="comment-editor comment-login-error">
        <p>Чтобы оставить комментарий <Link to="#" onClick={this.handleAuthClick}>войдите</Link> или <Link to="#" onClick={this.handleRegisterClick}>зарегистрируйтесь</Link>.</p>
      </div>
    ) );

    return (
      <div className="story-comments" ref="commentsBlock">
        <div id="comments">
          <div className="comments-head">Коментарии</div>
          {commentsComponent}
          {commentEditorHTML}
        </div>
      </div>
  )}

}

export default CommentsBlock;
