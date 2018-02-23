import axios from 'axios';

class CommentsBlockActions {
  constructor() {
    this.generateActions(
      'postCommentStart',
      'postCommentFail',
      'postCommentSuccess',
      'updateData',
    );
  }

  postComment( storyuID, content ){
    this.postCommentStart();

    axios.put( '/comments', { storyuID, content } )
      .then( response  => this.postCommentSuccess(response.data) )
      .catch( err => this.postCommentFail(err) )

    return true;
  }

  static displayName = 'CommentsBlockActions';
}

export default CommentsBlockActions;
