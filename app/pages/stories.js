import React from 'react';
import { ContentContainer } from '../containers';


export default function ScaryPage(props) {
  const { page = '1' } = props.match.params;

  return (
    <ContentContainer
      page={page}
      token="stories"
    />
  );
}
