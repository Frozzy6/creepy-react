import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { ContentContainer } from '../containers';


export default function ScaryPage(props){
  const {
    match: {
      params: {
        page = 1
      }
    }
  } = props;

  return (
    <ContentContainer
      page={page}
      token="stories"
    />
  );
}
