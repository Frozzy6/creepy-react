import alt from '../alt';
import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const API_HOST = config[NODE_ENV].API_HOST;

class UserStoryActions {
  constructor() {
    this.generateActions(
      'postUserStorySuccess',
      'postUserStoryStart',
      'postUserStoryFail',
      'responseCaptchaSend',
      'updateData',
      'disable',
      'enable'
    );
  }


  postStory( data ) {
    const URL = `${API_HOST}/stories/new`;

    this.postUserStoryStart();
    this.disable();

    axios.put( URL, data )
      .then( response => {
        this.postUserStorySuccess();
        this.enable();
      })
     .catch( err => {
       this.enable();
       this.postUserStoryFail( err );
       console.log('Post error: ' + err);
     });

    // To prevent warn message
    return true;
  }

  static displayName = 'UserStoryActions';
}

export default UserStoryActions;
