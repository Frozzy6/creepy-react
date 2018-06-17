import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TagItem extends PureComponent {
  render() {
    const { tag } = this.props;
    return <Link to={`/tags/${tag}`} className='tag'>{ tag }</Link>;
  }
}

TagItem.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default TagItem;
