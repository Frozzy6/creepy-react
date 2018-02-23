import alt from '../alt';
import axios from 'axios';

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
    const URL = '/stories/new';
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
