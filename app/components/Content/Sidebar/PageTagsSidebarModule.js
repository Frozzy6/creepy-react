import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

function PageTagsSidebarModule(props) {
  const { tags } = props;

  return (
    <div className="sidebar-item sidebar-item__tags">
      <h2>
        <Link to='/tags'>Теги на странице</Link>
      </h2>
      <div className="sidebar-item-body">
        {
          tags.map(
            (tag, index) => <Link to={`/tags/${tag}`} key={index}>{tag}</Link>,
          )
        }
      </div>
    </div>
  );
}

PageTagsSidebarModule.propTypes = {
  tags: PropTypes.instanceOf(List),
};

export default PageTagsSidebarModule;
