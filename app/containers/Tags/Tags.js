import React from 'react';
import { connect } from 'react-redux';

export class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Tags</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

export default connect(mapStateToProps)(TagsContainer);
