import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { isEqual } from 'lodash';

import {
  requestStoriesAC,
  requestStoryAC,
} from '../../actions';
import Content from '../../components/Content/Content';

class ContentContainer extends Component {
  constructor(props) {
    super(props);

    const {
      token,
      page,
    } = this.props;

    this.props.requestStoriesAC(token, page);
  }

  state = {
    page: this.props.page,
    stories: new Map(),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.page !== nextProps.page) {
      nextProps.requestStoriesAC(nextProps.token, nextProps.page);
      return {
        page: nextProps.page,
      };
    }
    const prevEntries = prevState.stories.get('entries');
    const nextEntries = nextProps.stories.get('entries');

    if (!isEqual(prevEntries, nextEntries)) {
      return {
        stories: nextProps.stories,
      };
    }

    return null;
  }

  render() {
    const {
      token,
      helloMessage,
    } = this.props;
    const {
      stories,
      page,
    } = this.state;

    return (
      <Content
        stories={stories.get('entries')}
        helloMessage={helloMessage}
        showPagination={stories.get('showPagination')}
        storiesTotal={stories.get('count')}
        currentPage={parseInt(page, 10)}
        token={token}
      />
    );
  }
}

ContentContainer.propTypes = {
  requestStoriesAC: PropTypes.func.isRequired,
  stories: PropTypes.instanceOf(Map).isRequired,
  token: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  helloMessage: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    stories: state.stories,
  };
}

export default connect(
  mapStateToProps,
  {
    requestStoriesAC,
    requestStoryAC,
  },
)(ContentContainer);
