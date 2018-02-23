class ContentActions {
  constructor() {
    this.generateActions(
      'getStoriesSuccess',
      'getStoriesFail',
      'getTotalStories',
      'showPagination',
      'hidePagination',
      'startLoading',
      'updateRating',
      'addComment'
    );
  }

  static displayName = 'ContentActions';
}

export default ContentActions;
