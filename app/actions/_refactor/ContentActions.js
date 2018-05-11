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
      'addComment',
      'likeSuccess',
      'likeFailed',
      'initialDataSuccess',
      'resetLikes'
    );
  }

  toggleLikeTo( args ) {
    const { uID, shouldInc } = args;

    const token = shouldInc ? 'like' : 'unlike';
    const URL = `${API_HOST}/stories/${token}/${uID}`;
    const actions = this;

    axios
      .post( URL )
      .then( res => {
        actions.likeSuccess( {uID, inc: ( shouldInc ? 1 : -1)} )
      })
      .catch( err => actions.likeFailed( {uID, err} ));
    return false;
  }

  getInitial() {
    const URL = `${API_HOST}/stories/initial`;

    const state = this.getStore('ContentStore').getState();
    const uids = state.stories.map( story => story.uID );

    return axios
      .post( URL, { uids })
      .then( res => this.initialDataSuccess(res.data) )
      .catch( err => console.log(err));
  }

  static displayName = 'ContentActions';
}

export default ContentActions;
