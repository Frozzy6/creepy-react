import React from 'react';
import { Link } from 'react-router-dom';

export default function PageTagsSidebarModule(props) {
  const {
    tags,
  } = props;

  let tagsHTML = null;

  if ( tags.length > 0 ) {
    tagsHTML = tags.map( ( tag, index ) => {
      return ( <Link to={'/tags/'+tag} key={index}>{tag}</Link>);
    });
  }

  return (
    <div className="sidebar-item sidebar-item__tags">
      <h2>
        <Link to='tags'>Теги на странице</Link>
      </h2>
      <div className="sidebar-item-body">
        {
          tags.map((tag, index) =>
            <Link to={'/tags/'+tag} key={index}>{tag}</Link>
          )
        }
      </div>
    </div>
  )
}
