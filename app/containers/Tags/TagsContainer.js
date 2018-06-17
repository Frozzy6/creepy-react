import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { requestTags } from '../../actions';

import Tags from '../../components/Tags/Tags';

export class TagsContainer extends Component {
  componentDidMount() {
    this.props.requestTags();
  }

  render() {
    return <Tags list={this.props.list} />;
  }
}

const mapStateToProps = state => ({
  list: state.tags.get('list'),
});

TagsContainer.propTypes = {
  list: PropTypes.instanceOf(List),
  requestTags: PropTypes.func.isRequired,
};

TagsContainer.defaultProps = {
  list: [],
};

export default connect(mapStateToProps, { requestTags })(TagsContainer);
