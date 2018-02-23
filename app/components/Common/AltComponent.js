//TODO: make useful named component for save binded actions and stores before
import React from 'react';

class AltComponent extends React.Component {
  constructor( props ){
    super(props);
  }

  render(){
    return ( <div>{this.props.children}</div>)
  }
}

export default AltComponent;
