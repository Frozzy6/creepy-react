import React, {PropTypes} from 'react';
import {Helmet} from "react-helmet";

import TagItem from './TagItem';

class Tags extends React.Component {
  static fetch = [
    {
      storeName: 'TagsStore',
      fetch: 'fetchTags',
      args: ['flux']
    }
  ];

  constructor(props){
    super(props);
    const flux = props.flux;

    this.tagsStore = flux.getStore('TagsStore');
    this.tagsActions = flux.getActions('TagsActions');

    this.state = this.tagsStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.tagsStore.listen(this.onChange);
    this.tagsStore.fetchTags( this.props.flux );
  }

  componentWillUnmount() {
    this.tagsStore.unlisten(this.onChange);
  }

  handleChange( event ) {
    let value = event.target.value;

    this.tagsActions.updateSearchQuery( value );
  }

  onChange(state) {
    this.setState(state);
  }

  /**
   * Renders TagItem
   * @param {string} tag - tag's name
   * @param {number} [index] - use index as key prop
   * @return {JSX.Element} 
   */
  renderTagItem(tag, index = null) {
    return (
      <TagItem tag={tag} key={index} />
    )
  }

  /**
   * Render list of tags
   * @return {JSX.Element}
   */
  renderTagItems() {
    const { filteredTags } = this.state;

    return (
      <div className="taglist">
        { filteredTags.map(this.renderTagItem) }
      </div>
    );
  }

  render() {
    return (
      <div className="content wide">
         <Helmet>
           <title>Список тем</title>
         </Helmet>
        <div className="tags-list">
          <h1>Темы историй:</h1>
          <input 
            type="text"
            className="tag-list__search"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Поиск по тегам" 
          />

          {this.renderTagItems}
        </div>
      </div>
    );
  }
}

export default Tags;
