import { connect } from 'react-redux';

import {
  getCurrentUser,
  getAuthState,
  getTagsPerPage,
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
  getRegisterError,
} from '../../actions';
import Sidebar from '../../components/Content/Sidebar/Sidebar';

export default connect(state => ({
  user: getCurrentUser(state),
  authState: getAuthState(state),
  tags: getTagsPerPage(state),
  registerError: getRegisterError(state),
}), {
  requestAuthAC,
  requestRegAC,
  requestLogoutAC,
})(Sidebar);
