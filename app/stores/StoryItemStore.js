class StoryItemStore {
  constructor( uID ) {
    const storyItemActions = this.alt.getActions('StoryItemActions');

    this.bindAction( storyItemActions['SET_STATUS_DONE' + uID], this.onSetStatusDone );
    this.bindAction( storyItemActions['SET_STATUS_FAILED' + uID], this.onSetStatusFailed );

    this.liked = false;
    this.commentMessage = '';
  }

  onSetStatusDone( uID ){
    this.liked = !this.liked;
    const incParam = ( this.liked ? 1 : -1);

    this.alt.getActions('ContentActions').updateRating.defer( uID, incParam );
    this.alt.getActions('TagContentActions').tagUpdateRating.defer( uID, incParam );
  }

  onSetStatusFailed( err ){
    console.log('Like Failed', err);
  }
}

export default StoryItemStore;
