import TagContentSource from '../sources/TagContentSource';
import StoryItemActions  from '../actions/StoryItemActions';
import StoryItemStore  from '../stores/StoryItemStore';

class TagContentStore {
  constructor() {
    this.bindActions( this.alt.getActions('TagContentActions') );

    this.stories = [];

    this.exportAsync(TagContentSource( this.alt ));
  }

  onGetStroriesByTagSuccess( tagStories ) {
    const tagInfo = tagStories[0];
    const stories = tagStories[1];
    const alt = this.alt;

    alt.getActions('AppActions').stopLoading.defer();

    // Create for each story its own actions and store ( if not exists yet )
    stories.map( (story) => {
      const store = alt.getStore( 'StoryItemStore' + story.uID );
      if ( !store ) {
        alt.createActions( StoryItemActions, {}, story.uID );
        alt.createStore( StoryItemStore, 'StoryItemStore' + story.uID, story.uID );
      }
    });
    this.tagInfo = tagInfo;
    this.stories = stories;
  }

  onGetStroriesByTagFail( errorMessage ) {
    this.appActions.stopLoading.defer();
    toastr.error(errorMessage);
  }

  onTagUpdateRating( options ){
    const uID = options[0];
    const inc = options[1];

    for (var i = 0; i < this.stories.length; ++i) {
      let story = this.stories[i];

      if ( story.uID === uID ) {
        story.rating += inc;
        break;
      }
    }
  }

}

export default TagContentStore;
