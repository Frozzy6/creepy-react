import React from 'react';
import { Helmet } from "react-helmet";

import StoryItem from './StoryItem/StoryItem';

class StoriesList extends React.Component {
  render(){
    const {
      stories,
    } = this.props;

    // const isLoading = this.state.loading;
    const isLoading = false;
    const isSingle = stories.length === 1;

    let html = null;
    let helmet = null;

    if ( stories.size > 0 ) {
      html = stories.map( (story, index) => {
        return ( <StoryItem story={story} key={story.get('uID')}/> );
      });
    } else if ( !isLoading ){
      html = (
        <div className="panel-top">
          <h1>Ничего нет</h1>
          <p>По данной ссылке нет историй.</p>
        </div>
      );
    }

    return (
      <div className={'content'}>
        {html}
      </div>
  );}
}

export default StoriesList;
