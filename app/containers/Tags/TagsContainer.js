import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { requestTags } from '../../actions/tags'

import TagItem from '../../components/Tags/TagItem';

export class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    query: '',
    filteredTags: [],
  }

  componentWillMount() {
    this.props.requestTags();
  }

  /**
   * Renders TagItem
   * @param {string} tag - tag's name
   * @param {number} [index] - use index as key prop
   * @return {JSX.Element} 
   */
  renderTagItem(tag, index = null) {
    return <TagItem tag={tag} key={index} />;
  }

  /**
   * Renders list of tags
   * @return {JSX.Element}
   */
  renderTagList() {
    const { list } = this.props;

    if (list) {
      return (
        <div className="taglist">
          { list.toJS().map(this.renderTagItem) }
        </div>
      );
    }

    return null;
  }

  renderSearchField() {
    return (
      <div>
        <h1>Темы историй:</h1>
        <input 
          type="text"
          className="tag-list__search"
          value={this.state.query}
          onChange={() => {}}
          placeholder="Поиск по тегам" 
        />
      </div>
    );
  }

  render() {
    return (
      <div className="content wide">
        <Helmet><title>Список тем</title></Helmet>

        <div className="tags-list">
          { this.renderSearchField() }
          { this.renderTagList() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.tags.get('list')
  };
}

export default connect(mapStateToProps, { requestTags })(TagsContainer);
