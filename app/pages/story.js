import React from 'react';

import { SingleContentContainer } from '../containers';

export default function StoryPage(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  return (
    <SingleContentContainer
      token="story"
      id={id}
    />
  );
}
