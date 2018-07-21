import { connect } from 'react-redux';

import {
  getSidebarIsOpen,
  openSidebarAC,
  closeSidebarAC,
  requestLogoutAC,
  isUserAuthorized,
  openDialogAC,
  getCurrentUserUsername,
} from '../../actions';
import { AUTH_MODAL_ITEM } from '../../components/AuthModal/AuthModal';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';

export default connect(state => ({
  isOpen: getSidebarIsOpen(state),
  isUserAuthorized: isUserAuthorized(state),
  user: getCurrentUserUsername(state),
}), {
  openSidebarAC,
  closeSidebarAC,
  getCurrentUserUsername,
  requestLogoutAC,
  openDialogAC: () => openDialogAC(AUTH_MODAL_ITEM),
})(MobileSidebar);
