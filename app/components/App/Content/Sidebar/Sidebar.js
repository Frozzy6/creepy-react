import React from 'react';

import AuthSidebarModule from './AuthSidebarModule';
import UserSidebarModule from './UserSidebarModule';
import PageTagsSidebarModule from './PageTagsSidebarModule';

class Sidebar extends React.Component {
  constructor(props){
    super(props);

    this.flux = this.props.flux;

    this.appStore = this.flux.getStore('AppStore');
    this.onAppChange = this.onAppChange.bind(this);
    this.state = {
      appState: this.appStore.state
    };
  }

  render(){
    const tags = this.props.sidebarTags;
    const appState = this.state.appState;
    const sidebarBlocks = [];

    if ( appState.user ) {
      sidebarBlocks.push( <UserSidebarModule flux={this.flux} key="1"/> )
    } else {
      sidebarBlocks.push( <AuthSidebarModule flux={this.flux} key="1"/> )
    }

    sidebarBlocks.push( <PageTagsSidebarModule sidebarTags={tags} key="2"/>)

    return (
      <div className="sidebar" ref="sidebar">
        {sidebarBlocks}
      </div>
  )}

  componentWillMount(){
    this.appStore.listen(this.onAppChange);
  }

  componentWillUnmount() {
    this.appStore.unlisten(this.onAppChange);
  }

  onAppChange( state ){
    if ( this.refs.sidebar ) {
      this.setState({ appState: state });
    }
  }
}

export default Sidebar;
