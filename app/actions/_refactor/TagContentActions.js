class TagContentActions {
  constructor() {
    this.generateActions(
      'getStroriesByTagSuccess',
      'getStroriesByTagFail',
      'getStoriesByTagLoading',
      'tagUpdateRating'
    );
  }

  getStroriesByTag( tag ) {
    this.alt.getActions('AppActions').startLoading();

    return true;
  }

  static displayName = 'TagContentActions';
}

export default TagContentActions;
