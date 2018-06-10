import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import StoryItemContainer from '../../containers/StoryItem/StoryItemContainer';

export default function StoryDetails(props) {
  const {
    story,
  } = props;

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
        <StoryItemContainer
          story={story}
          verbose={true}
        />
      </Fragment>
    );
  //TODO: move to one top level
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
