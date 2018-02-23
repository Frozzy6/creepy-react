import React from 'react';
import {Helmet} from "react-helmet";

import StoryItem from './StoryItem/StoryItem';
import AppStore from '../../../stores/AppStore';

class StoriesList extends React.Component {
  constructor(props){
    super(props)
    const flux = props.flux;

    this.onChange = this.onChange.bind(this);
    this.appStore = flux.getStore('AppStore');
    this.state = this.appStore.getState();
  }

  componentDidMount() {
    this.appStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render(){
    const flux = this.props.flux;
    const stories = this.props.stories;
    const isLoading = this.state.loading;
    const isSingle = stories.length === 1;

    let html = null;
    let helmet = null;

    if ( stories.length > 0 ) {
      html = stories.map( (story, index) => {
        return ( <StoryItem story={story} key={story.uID} flux={flux} verbose={isSingle}/> );
      });
    } else if ( !isLoading ){
      html = (
        <div className="panel-top">
          <h1>Ничего нет</h1>
          <p>По данной ссылке нет историй.</p>
        </div>
      );
    }

    if ( isSingle ) {
      let story = stories[0];
      helmet = (
        <Helmet>
          <title>{story.data.title + ' - Страшные истории'}</title>
          <meta name='Title' content={story.data.title + ' - Страшные истории'}/>
          <meta name='Description' content={story.data.description}/>
        </Helmet>
      )
    };

    return (
      <div className={"content " + (stories.length === 1 ? 'wide' : '')}>
        {helmet}
        {html}
      </div>
  );}
}

export default StoriesList;
