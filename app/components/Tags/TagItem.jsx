import React from 'react';
import { Link } from 'react-router';

class TagItem extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    const { tag } = this.props;
    return <Link to={"/tags/" + tag} className="tag">{tag}</Link>;
  }
}

export default TagItem;
