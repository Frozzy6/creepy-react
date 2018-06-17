import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { List } from 'immutable';

import TagItem from './TagItem';

class Tags extends PureComponent {
  constructor(props) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
  }

  state = {
    query: '',
    list: [],
    filteredTags: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list !== prevState.list) {
      return {
        filteredTags: nextProps.list,
      };
    }
  }

  onQueryChange(event) {
    const { value } = event.target;
    const filteredTags = this.props.list
      .filter(tag => tag.indexOf(value) !== -1);

    this.setState({ query: value, filteredTags });
  }

  renderTagItems() {
    const { filteredTags } = this.state;

    return (
      <div className='taglist'>
        { filteredTags.map(tag => (<TagItem tag={tag} key={tag} />)) }
      </div>
    );
  }

  renderSearchField() {
    return (
      <div>
        <h1>Темы историй:</h1>
        <input
          type='text'
          className='tag-list__search'
          value={this.state.query}
          onChange={this.onQueryChange}
          placeholder='Поиск по тегам'
        />
      </div>
    );
  }

  render() {
    return (
      <div className='content wide'>
         <Helmet><title>Список тем</title></Helmet>

        <div className='tags-list'>
          {this.renderSearchField()}
          {this.renderTagItems()}
        </div>
      </div>
    );
  }
}

Tags.propTypes = {
  list: PropTypes.instanceOf(List),
};

Tags.defaultProps = {
  list: [],
};

export default Tags;
