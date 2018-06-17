import { connect } from 'react-redux';

import StoryItem from '../../components/Content/StoryItem/StoryItem';
import {
  requestLikeAC,
  requestDislikeAC,
  isUserAuthorized,
  openDialogAC,
} from '../../actions';

export default connect(state => ({
  isAuth: isUserAuthorized(state),
}), {
  requestLikeAC,
  requestDislikeAC,
  openDialogAC,
})(StoryItem);
