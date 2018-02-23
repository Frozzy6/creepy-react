import React from 'react';
import {Link} from 'react-router';

class Logo extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.flux.getStore('LogoStore');
    this.state = this.store.getState();
  }

  render() {
    const state = this.state;

    return (
      <div className="top">
        <div className="wrap header">
          <Link to="/" title="Страшные истории">
            <img className="scary-label" src="/images/logo.png"/>
          </Link>
          {/* <Link to="#"> */}
          <img src={"/images/lg/" + state.imgNumber + ".png"} className="ghost-logo"/>
          {/* </Link> */}
        </div>
      </div>
    )
  }
}

export default Logo;
