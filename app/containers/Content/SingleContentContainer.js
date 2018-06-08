import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import {
  requestStoryAC,
  getStory,
} from '../../actions';
import Content from '../../components/Content/Content';

class SingleContentContainer extends Component {
  constructor(props) {
    super(props);
    const {
      id,
      token,
    } = this.props;

    this.props.requestStoryAC(token, id);
  }

  render() {
    const {
      token,
      story,
    } = this.props;

    return (
      <Content
        story={story}
        token={token}
        helloMessage={false}
        showPagination={false}
      />
    );
  }
}

SingleContentContainer.propTypes = {
  requestStoryAC: PropTypes.func.isRequired,
  requestStoriesAC: PropTypes.func.isRequired,
  story: PropTypes.instanceOf(Map).isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};


export default connect(
  state => ({
    story: getStory(state),
  }),
  {
    requestStoryAC,
  },
)(SingleContentContainer);
