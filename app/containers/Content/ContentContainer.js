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
      token,
      offset,
    } = this.props;

    this.props.requestStoriesAC(token, offset);
  }

  componentWillReceiveProps(nextProps) {
    const {
      token,
      page,
    } = nextProps;

    if ( page !== this.props.page ) {
      this.props.requestStoriesAC(token, page);
    }
  }

  render(){
    const {
      token,
      stories,
      helloMessage,
      page,
    } = this.props;

    return (
      <Content
        stories={stories.toJS().entries}
        helloMessage={helloMessage}
        showPagination={stories.toJS().showPagination}
        storiesTotal={stories.toJS().count}
        currentPage={parseInt(page, 10)}
        /* change to token prop */
        query={token}
      />
    )
  }
}

ContentContainer.propTypes = {
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
