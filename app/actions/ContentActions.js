import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const API_HOST = config[NODE_ENV].API_HOST;

class ContentActions {
  constructor( ) {
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
