import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const API_HOST = config[NODE_ENV].API_HOST;

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

    axios.put( `${API_HOST}/comments`, { storyuID, content } )
      .then( response  => this.postCommentSuccess(response.data) )
      .catch( err => this.postCommentFail(err) )

    return true;
  }

  static displayName = 'CommentsBlockActions';
}

export default CommentsBlockActions;
