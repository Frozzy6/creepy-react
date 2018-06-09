import { connect } from 'react-redux';

import UserStory from '../../components/UserStory/UserStory';
import {
  getUserStoryState,
  requestAddStoryAC,
} from '../../actions';

export default connect(state => ({
  pageState: getUserStoryState(state),
}), {
  requestAddStoryAC,
})(UserStory);
