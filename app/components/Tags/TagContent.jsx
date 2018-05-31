import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Helmet} from "react-helmet";

import StoryItem from '../Content/StoryItem/StoryItem';

class TagContent extends React.Component {
  static fetch = [
    {
      storeName: 'TagContentStore',
      fetch: 'fetchTagContent',
      args: ['tagContentToken', 'flux']
    }
  ];

  constructor(props){
    super(props);
    const flux = props.flux;

    this.tagContentStore = flux.getStore('TagContentStore');
    this.tagContentActions = flux.getActions('TagContentActions');
    this.state = this.tagContentStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const tag = this.props.params.tag;

    this.tagContentStore.listen(this.onChange);
    this.tagContentStore.fetchTagContent( tag, this.props.flux );
  }

  componentWillUnmount() {
    this.tagContentStore.unlisten(this.onChange);
  }

  componentWillReceiveProps(nextProps){
    const prevTag = this.props.params.tag;
    const nextTag = nextProps.params.tag;

    if ( prevTag !== nextTag ) {
      this.tagContentStore.fetchTagContent( nextTag );
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const tag = this.props.params.tag;
    const flux = this.props.flux;
    const stories = this.state.stories;
    const tagInfo = this.state.tagInfo || {};
    const description = tagInfo.description;
    const image = tagInfo.image;
    let storiesHTML = null;
    let imageHTML = null;

    if ( stories.length > 0 ) {
      storiesHTML = stories.map( (story, index) => {
        return ( <StoryItem story={story} key={story.uID} activeTag={tag} flux={flux}/> );
      });
    } else {
      storiesHTML = (
        <div className="story">
          <p> К сожалению по данному тегу ничего нет </p>
        </div>
      )
    }
    if ( image ) {
      imageHTML = ( <div className="tag-icon-aside">
        <img src={image}/>
      </div> )
    }

    return (
      <div className="tag-content">
        <Helmet>
          <title>{tag.charAt(0).toUpperCase() + tag.slice(1) + ' - Страшные истории'}</title>
        </Helmet>
        <div className="content header">
          <h1><Link className="tag-content__back-link" to="/tags/">Истории по теме</Link>: <span style={{color:"red"}}>{tag}</span></h1>
          <div className="text">
            <p>{description}</p>
          </div>
        </div>
        {imageHTML}
        <div className="content">
          {storiesHTML}
        </div>
        <div style={{clear:"both"}}></div>
      </div>
    );
  }
}

export default TagContent;
