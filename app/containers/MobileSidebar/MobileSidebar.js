import { connect } from 'react-redux';

import {
  getSidebarIsOpen,
  openSidebarAC,
  closeSidebarAC,
} from '../../actions';

import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';

export default connect(state => ({
  isOpen: getSidebarIsOpen(state),
}), {
  openSidebarAC,
  closeSidebarAC,
})(MobileSidebar);
