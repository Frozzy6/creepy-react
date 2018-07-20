import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isTouchingEnabled = typeof window === 'object' && 'ontouchstart' in window;

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarWidth: 0,
      // if touch is supported by the browser
      dragSupported: isTouchingEnabled,
      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchStartY: null,
      distanceX: null,
      distanceY: null,
      touchCurrentX: null,
      touchCurrentY: null,
      isMoving: false,
    };

    this.sidebarChildren = React.createRef();
  }

  componentDidMount() {
    const { body } = document;
    this.saveSidebarWidth();
    body.addEventListener('touchstart', this.onTouchStart);
    body.addEventListener('touchmove', this.onTouchMove);
    body.addEventListener('touchcancel', this.onTouchEnd);
    body.addEventListener('touchend', this.onTouchEnd);
  }

  componentDidUpdate() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarWidth();
    }
  }

  onTouchStart = (ev) => {
    const { open } = this.props;
    const { sidebarWidth } = this.state;
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const { identifier, clientX, clientY } = ev.targetTouches[0];
      if (open && clientX > sidebarWidth) {
        // this.overlayClicked(ev);
        return false;
      }

      this.setState({
        touchIdentifier: identifier,
        touchStartX: clientX,
        touchStartY: clientY,
        isMoving: false,
      });
    }
    return ev;
  }

  onTouchMove = (ev) => {
    if (this.isTouching()) {
      for (let ind = 0; ind < ev.targetTouches.length; ind += 1) {
        // only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          const { touchStartX, touchStartY } = this.state;
          const { clientX: currentX, clientY: currentY } = ev.targetTouches[ind];
          const deltaX = Math.abs(currentX - touchStartX);
          const deltaY = Math.abs(currentY - touchStartY);
          if (deltaY * 1.7 > deltaX) {
            this.onTouchEnd(true);
          } else {
            this.setState({
              isMoving: true,
              touchCurrentX: ev.targetTouches[ind].clientX,
              touchCurrentY: ev.targetTouches[ind].clientY,
            });
          }
          break;
        }
      }
    }
  }

  onTouchEnd = () => {
    if (!this.isTouching()) { return; }

    const { open } = this.props;
    const touchWidth = this.touchSidebarWidth();
    // 3rd part of current sidebar body width
    const dragToggleDistance = this.sidebarChildren.current.offsetWidth / 3;
    if ((open && touchWidth > this.getChidlrenWidth()) ||
        (!open && touchWidth > dragToggleDistance)) {
      this.props.onSetOpen(!this.props.open);
    }

    this.setState({
      touchIdentifier: null,
      isMoving: false,
      touchStartX: null,
      touchStartY: null,
      touchCurrentX: null,
      touchCurrentY: null,
    });
  }

  getChidlrenWidth() {
    const node = this.sidebarChildren.current;
    return node ? node.offsetWidth : 0;
  }

  isTouching() {
    return this.state.touchIdentifier !== null;
  }

  overlayClicked = () => {
    // TODO: get another way to prevent user's action
    if (this.props.open) {
      setTimeout(() => {
        this.props.onSetOpen(false);
      }, 200);
    }
  }

  saveSidebarWidth() {
    const sidebarWidth = this.sidebarChildren.current.offsetWidth;
    if (sidebarWidth !== this.state.sidebarWidth) {
      this.setState({ sidebarWidth });
    }
  }

  // calculate the sidebarWidth based on current touch info
  touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      return this.state.sidebarWidth + this.state.touchCurrentX;
    }
    const distance = this.state.touchCurrentX - this.state.touchStartX;
    return Math.abs(distance) > 50 ? distance : 0;
  }

  componentWillUnmount = () => {
    const { body } = document;
    body.removeEventListener('touchstart', this.onTouchStart);
    body.removeEventListener('touchmove', this.onTouchMove);
    body.removeEventListener('touchcancel', this.onTouchEnd);
    body.removeEventListener('touchend', this.onTouchEnd);
  }

  render() {
    const sidebarStyle = {};
    const overlayStyle = {};
    const rootProps = {
      className: this.props.rootClassName,
    };

    const isTouchingNow = this.state.isMoving;

    // sidebarStyle right/left
    sidebarStyle.left = 0;
    sidebarStyle.transform = 'translateX(-100%)';
    sidebarStyle.WebkitTransform = 'translateX(-100%)';

    if (!this.props.open && this.sidebarChildren.current) {
      document.body.classList.remove('no-scroll');
      const percentage = this.touchSidebarWidth() / this.getChidlrenWidth();
      sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
      sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`;
      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage;
      overlayStyle.display = 'none';
    } else if (this.props.open) {
      document.body.classList.add('no-scroll');
      // slide open sidebar
      sidebarStyle.transform = 'translateX(0%)';
      sidebarStyle.WebkitTransform = 'translateX(0%)';

      // show overlay
      overlayStyle.opacity = 1;
    }

    if (isTouchingNow) {
      overlayStyle.display = 'block';
    }

    return (
      <div {...rootProps}>
        <div
          className={this.props.sidebarClassName}
          style={sidebarStyle}
          ref={this.sidebarChildren}
        >
          {this.props.children}
        </div>
        <div
          className={this.props.overlayClassName}
          style={overlayStyle}
          role="presentation"
          tabIndex="0"
          onTouchStart={this.overlayClicked}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  rootClassName: PropTypes.string.isRequired,
  sidebarClassName: PropTypes.string.isRequired,
  overlayClassName: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onSetOpen: PropTypes.func,
};

Sidebar.defaultProps = {
  open: false,
  onSetOpen: () => {},
};

export default Sidebar;
