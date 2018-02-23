import React from 'react';
import {Link} from 'react-router';

class TagItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const tag = this.props.tag;

    return (
      <Link to={"/tags/" + tag} className="tag">{tag}</Link>
  )}
}

export default TagItem;
