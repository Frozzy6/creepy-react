import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable'

import { requestStoriesAC, requestStoryAC } from '../../actions';
import Content from '../../components/Content/Content';

class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const {
      query,
      offset,
    } = this.props;

    // const id = this.props.match.params.id;
    // const stories = ['stories', 'scary'];
    // if (stories.includes(query)){
    //   this.props.requestStoriesAC(query, offset);
    // } else {
    //   this.props.requestStoryAC(id);
    // }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: should use smth like that
    // https://gist.github.com/Yimiprod/7ee176597fef230d1451
    // to diff objects
    const {
      query: prevQuery,
      // id: prevId,
      // offset: prevOffset,
    } = this.props;
    const prevOffset = this.props.match.params.page || "1";
    const prevId = this.props.match.params.id;

    const {
      query,
      // id,
      // offset,
    } = nextProps;
    const offset = nextProps.match.params.page || "1";
    const id = nextProps.match.params.id;

    if (query !== prevQuery || offset !== prevOffset || id !== prevId) {
      // dublicate declaration
      const stories = ['stories', 'scary'];
      if (stories.includes(query)){
        this.props.requestStoriesAC(query, offset);
      } else {
        this.props.requestStoryAC(id);
      }
    }
  }

  render(){
    const {
      query,
      stories,
      helloMessage,
      // match: {
      //   params: { page = "1" }
      // }
    } = this.props;
    const page = 1;
    return (
      <Content
        stories={stories.toJS().entries}
        helloMessage={helloMessage}
        showPagination={stories.toJS().showPagination}
        storiesTotal={stories.toJS().count}
        currentPage={parseInt(page, 10)}
        query={query}
      />
    )
  }
}

ContentContainer.propTypes = {
  requestStoryAC: PropTypes.func.isRequired,
  requestStoriesAC: PropTypes.func.isRequired,
  stories: PropTypes.instanceOf(Map).isRequired,
};


function mapStateToProps(state) {
  return {
    stories: state.stories,
  }
}

export default connect(
  mapStateToProps,
  {
    requestStoriesAC,
    requestStoryAC,
  }
)(ContentContainer);
