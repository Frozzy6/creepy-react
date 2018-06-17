import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TagItem = (props) => {
  const { tag, active } = props;

  return (
    <li className={classNames('tag', { tag_highlight: active })}>
      <Link to={`/tags/${tag}`}>{tag}</Link>
    </li>
  );
};

TagItem.propTypes = {
  tag: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default TagItem;
