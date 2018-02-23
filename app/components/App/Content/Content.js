import React, {PropTypes} from 'react';
import {Helmet} from "react-helmet";

import Pagination from './Pagination';
import StoriesList from './StoriesList';
import Sidebar from './Sidebar/Sidebar';
import Greeting from './Greeting';

const getDescriptionByToken = function( token ){
  const DESC = {
    stories: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира.',
    scary: 'Собрание страшилок и страшных историй на основе реальных событий из разных уголков мира, показаные по популярности.',
    random: 'Случайная страшилка или страшная история. Каждый раз новая.'
  }

  return DESC[token];
};

class Content extends React.Component {
  static fetch = [
    {
      storeName: 'ContentStore',
      fetch: 'fetchStory',
      args: ['contentToken', 'contentParam', 'flux']
    }
  ];

  constructor(props){
    super(props);
    const flux = props.flux;
    this.contentStore = flux.getStore('ContentStore');
    this.contentActions = flux.getActions('ContentActions');

    this.appStore = flux.getStore('AppStore');

    this.state = this.contentStore.getState();
    this.state.appState = this.appStore.getState();

    this.onChange = this.onChange.bind(this);
    this.onAppDataChange = this.onAppDataChange.bind(this);

    const params = props.params;
    const param = params.page || params.id;

    if ( params && params.page ) {
      this.state.page = params.page;
    } else {
      this.state.page = 1;
    }
  }

  componentWillMount(){
    const token = this.props.route.query;
    this.setState({description: getDescriptionByToken( token )});
    this.appStore.listen(this.onAppDataChange);
  }

  componentDidMount() {
    const token = this.props.route.query;
    const params = this.props.params;
    var param = params.page || params.id;

    this.contentStore.listen(this.onChange);

    //Get list of stories by token {latest, scary or random} and offset
    if ( token !== 'random' || this.state.stories.length === 0 ) {
      this.contentStore.fetchStory( token, param, this.props.flux );
    }
  }

  componentWillUnmount() {
    this.contentStore.unlisten(this.onChange);
    this.appStore.unlisten(this.onAppDataChange);
  }

  componentWillReceiveProps(nextProps){
    const token = nextProps.route.query;
    const params = nextProps.params;
    var param = params.page || params.id;

    this.setState({description: getDescriptionByToken( token )});

    if ( params && params.page ) {
      this.state.page = params.page;
    } else {
      this.state.page = 1;
    }

    this.contentStore.fetchStory( token, param, this.props.flux );
  }

  onChange(state) {
    this.setState(state);
  }

  onAppDataChange(state) {
    if ( this.refs.content ) {
      this.setState({appState: state})
    }
  }

  render() {
    const stories = this.state.stories;
    const query = this.props.route.query;
    const param = this.props.params.page;

    let pagination = null;
    let sidebarHTML = null;
    let greetingHTML = null;
    let page = parseInt(this.state.page, 10) || 1;
    // TODO: is that bug
    // let maxPages = Math.ceil(this.state.count / stories.length);
    let maxPages = Math.ceil(this.state.count / 10 );

    if ( this.props.route.helloMessage && !this.state.appState.user ) {
      greetingHTML = <Greeting/>;
    }

    if ( this.state.showPagination && stories.length > 0 ) {
      pagination = <Pagination maxPages={maxPages} currentPage={page} query={query} flux={this.props.flux}/>;
    }

    /* Render sidebar only for desktop */
    if ( stories.length > 1 && this.state.appState.deviceType == "desktop" ) {
      sidebarHTML = <Sidebar flux={this.props.flux} sidebarTags={this.state.sidebarTags}/>;
    }

    return (
      <div ref="content">
        <Helmet>
          <title>Страшные истории</title>
          <meta name='Description' content={this.state.description}/>
        </Helmet>
        {greetingHTML}
        {pagination}
        <StoriesList stories={stories} flux={this.props.flux}/>
        {sidebarHTML}
        <div style={{clear:"both"}}></div>
        {pagination}
      </div>
    );
  }
}

export default Content;
