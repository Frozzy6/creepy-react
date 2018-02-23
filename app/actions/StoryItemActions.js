import axios from 'axios';

class StoryItemActions {
  constructor( uID ){
    this.generateActions(
      'setStatusDone' + uID,
      'setStatusFailed' + uID
    );

    this['toggleLike' + uID ] = function( shouldInc ){
      const token = shouldInc ? 'like' : 'dislike';
      const URL = '/stories/' + token + '/' + uID;
      const actions = this;

      axios.post(URL).then( (res) => {
        this['setStatusDone' + uID]( uID );
      }).catch( (err) => {
        actions['setStatusFailed' + uID]( err );
      });

      return false;
    }
  }

  static displayName = 'StoryItemActions';
}

export default StoryItemActions;
