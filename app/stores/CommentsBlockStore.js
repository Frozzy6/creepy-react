class CommentsBlockStore {
  constructor() {
    this.bindActions(this.alt.getActions('CommentsBlockActions'));
    this.message = '';
    this.isSending = false;
    this.isFailed = false;
  }

  onUpdateData( message ) {
    this.message = message;
  }


  onPostCommentStart( comment ){
    this.alt.getActions('AppActions').startLoading.defer()
    this.isSending = true;
  }

  onPostCommentFail(error) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.isSending = false;
    this.isFailed = true;
  }

  onPostCommentSuccess(comment) {
    this.alt.getActions('AppActions').stopLoading.defer();
    this.alt.getActions('ContentActions').addComment.defer( comment );
    this.message = '';
    this.isSending = false;
    this.isFailed = true;
  }


}

export default CommentsBlockStore;
