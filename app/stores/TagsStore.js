import TagsSource from '../sources/TagsSource';

class TagsStore {
  constructor() {
    this.bindActions(this.alt.getActions('TagsActions'));

    this._tags = [];
    this.filteredTags = [];
    this.query = '';

    this.exportAsync(TagsSource( this.alt ));
  }

  onGetTagsSuccess( tags ) {
    this._tags = tags;
    this.filteredTags = tags;
    if ( this.query !== '' ) {
      this.onUpdateSearchQuery( this.query );
    }
    this.alt.getActions('AppActions').stopLoading.defer();
  }

  onGetTagsFail( errorMessage ) {
    this.tags = [];
    this.alt.getActions('AppActions').stopLoading.defer();
    console.log(errorMessage);
  }

  onUpdateSearchQuery( query ) {
    query = query.toLowerCase();
    this.query = query;
    if ( this.query === '' ) {
      this.filteredTags = this._tags;
    } else {
      this.filteredTags = this._tags.filter( ( value ) => {
        return value.indexOf( query ) > -1;
      });
    }
  }
}

export default TagsStore;
