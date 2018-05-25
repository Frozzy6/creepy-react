import React, { Fragment } from 'react';
import { Helmet } from "react-helmet";

import StoryItem from './StoryItem/StoryItem';

export default function StoryDetails(props) {
  const {
    story,
  } = props;

  // const isLoading = this.state.loading;
  const isLoading = false;

  let html = null;
  let helmet = null;

  if (story) {
    html = (
      <Fragment>
        <Helmet>
          <title>{story.getIn(['data', 'title']) + ' - Страшные истории'}</title>
          <meta name='Title' content={story.getIn(['data', 'title']) + ' - Страшные истории'}/>
          <meta name='Description' content={story.getIn(['data', 'description'])}/>
        </Helmet>
        <StoryItem story={story} verbose={true}/>
      </Fragment>
    );
  } else if (!isLoading){
    html = (
      <div className="panel-top">
        <h1>Ничего нет</h1>
        <p>По данной ссылке нет историй.</p>
      </div>
    );
  }

  return (
    <div className={'content wide'}>
      {html}
    </div>
  );
}
