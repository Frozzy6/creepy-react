import ContentSource from '../sources/ContentSource';
// import StoryItemActions  from '../actions/StoryItemActions';
// import StoryItemStore  from '../stores/StoryItemStore';

const getTagsFromStories = function( stories ){
  stories = stories  || [];
  let tags = [];
  // Concat all arrays in a big one
  stories.forEach( function( story ){
    tags = tags.concat( story.tags );
  });

  // Removing duplicates
  tags = tags.filter( function( item, pos ) {
    return tags.indexOf( item ) == pos;
  } );

  return tags;
}

class ContentStore {
  constructor() {
    this.bindActions(this.alt.getActions('ContentActions'));
    this.stories = [];
    this.sidebarTags = [];
    this.exportAsync(ContentSource( this.alt ));
  }

  onGetTotalStories(count){
    this.count = count;
  }

  onGetStoriesSuccess(stories) {
    const alt = this.alt;
    this.alt.getActions('AppActions').stopLoading.defer();

    if ( stories && stories[0] && stories[0].err ){
      console.log('api error on get stories');
      this.stories = [];
      return false;
    }

    this.sidebarTags = getTagsFromStories( stories );
    // Create for each story its own actions and store ( if not exists yet )
    stories.map( (story) => {
      const store = alt.getStore( 'StoryItemStore' + story.uID );
      if ( !store ) {
        alt.createActions( StoryItemActions, {}, story.uID );
        alt.createStore( StoryItemStore, 'StoryItemStore' + story.uID, story.uID );
      }
    });
    this.alt.getActions('AppActions').stopLoading.defer();
    this.stories = stories;
  }

  hidePagination(){
    this.showPagination = false;
  }

  showPagination(){
    this.showPagination = true;
  }

  onGetStoriesFail(errorMessage) {
    this.showPagination = false;
    this.alt.getActions('AppActions').stopLoading.defer();
    this.stories = [];
    console.log(errorMessage);
  }

  onUpdateRating( options ) {
    const uID = options[0];
    const inc = options[1];

    for (var i = 0; i < this.stories.length; ++i) {
      let story = this.stories[i];
      if ( story.uID === uID ) {
        story.data.rating += inc;
        break;
      }
    }
  }

  onAddComment( comment ) {
    if ( this.stories.length > 1 ) {
      throw new Error('how? (:')
    }

    this.stories[0].comments.push(comment);
  }

}

export default ContentStore;
