import { connect } from 'react-redux';

import {
  getCurrentUserUsername,
  getCurrentUserRating,
  getAuthState,
  getTagsPerPage,
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
  getRegisterError,
} from '../../actions';
import Sidebar from '../../components/Content/Sidebar/Sidebar';

export default connect(state => ({
  username: getCurrentUserUsername(state),
  rating: getCurrentUserRating(state),
  authState: getAuthState(state),
  tags: getTagsPerPage(state),
  registerError: getRegisterError(state),
}), {
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
})(Sidebar);
