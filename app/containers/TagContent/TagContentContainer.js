import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import {
  getStoriesByTag,
  requestStoriesByTagAC,
} from '../../actions';
import TagContent from '../../components/TagContent/TagContent';

class TagContentContainer extends Component {
  constructor(props) {
    super(props);
    const { tag } = this.props.match.params;

    this.props.requestStoriesByTagAC(tag);
  }

  state = {
    tag: this.props.match.params.tag,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tag } = nextProps.match.params;
    if (tag !== prevState.tag) {
      nextProps.requestStoriesByTagAC(tag);
      window.scrollTo(0, 0);
      return { tag };
    }

    return null;
  }

  render() {
    const { tag } = this.state;
    const { stories } = this.props;

    return (
      <TagContent
        tag={tag}
        stories={stories}
      />
    );
  }
  //
  // componentWillReceiveProps(nextProps){
  //   const { tag } = this.props.match.params;
  //   const { tag: nextTag } = nextProps.match.params;
  //
  //   if (tag !== nextTag) {
  //     this.props.requestStoriesByTagAC(nextTag);
  //     window.scrollTo(0, 0);
  //   }
  // }
  //
  // render() {
  //   const { tag } = this.props.match.params;
  //   const { stories } = this.props;
  //
  //   return (
  //     <TagContent
  //       tag={tag}
  //       stories={stories}
  //     />
  //   );
  // }
}

TagContentContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tag: PropTypes.string.isRequired,
    }),
  }),
  stories: PropTypes.instanceOf(List),
  requestStoriesByTagAC: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    stories: getStoriesByTag(state),
  }),
  {
    requestStoriesByTagAC,
  },
)(TagContentContainer);
