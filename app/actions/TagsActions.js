class TagsActions {
  constructor() {
    this.generateActions(
      'getTagsSuccess',
      'getTagsFail',
      'getTagsFromStories',
      'updateSearchQuery',
      //TODO:remove
      'tagsStartLoading'
    );
  }

  getTags() {
    this.alt.getActions('AppActions').startLoading();

    return true;
  }

  static displayName = 'TagsActions';
}

export default TagsActions;
