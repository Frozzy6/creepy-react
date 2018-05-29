import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import {
  requestStoriesAC,
  requestStoryAC,
} from '../../actions';
import Content from '../../components/Content/Content';

class SingleContentContainer extends Component {
  componentWillMount(){
    const {
      id,
      token,
    } = this.props;

    this.props.requestStoryAC(token, id);
  }

  render(){
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
    )
  }
}

SingleContentContainer.propTypes = {
  requestStoryAC: PropTypes.func.isRequired,
  requestStoriesAC: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    story: state.stories.get('story'),
  }
}

export default connect(
  mapStateToProps,
  {
    requestStoriesAC,
    requestStoryAC,
  }
)(SingleContentContainer);
