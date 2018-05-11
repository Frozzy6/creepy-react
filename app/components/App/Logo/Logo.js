import React from 'react';
import {Link} from 'react-router-dom';

class Logo extends React.Component {
  render() {
    const {
      logoNumber
    } = this.props;

    return (
      <div className="top">
        <div className="wrap header">
          <Link to="/" title="Страшные истории">
            <img className="scary-label" src="/images/logo.png"/>
          </Link>
          <Link to="#">
          {/* <img src={"/images/lg/" + state.imgNumber + ".png"} className="ghost-logo"/> */}
            <img src={`/images/lg/${logoNumber}.png`} className="ghost-logo"/>
          </Link>
        </div>
      </div>
    )
  }
}

export default Logo;
