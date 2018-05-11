import React from 'react';
import {Link} from 'react-router';

class PageTagsSidebarModule extends React.Component {
  constructor( props ){
    super(props);
  }

  render(){
    const tags = this.props.sidebarTags;

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
        <div className="sidebar-item-body">{tagsHTML}</div>
      </div>
  )}
}

export default PageTagsSidebarModule;
