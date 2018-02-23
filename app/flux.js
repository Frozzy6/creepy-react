import Alt from 'alt';

import AppActions from './actions/AppActions';
import ContentActions from './actions/ContentActions';
import TagsActions from './actions/TagsActions';
import TagContentActions from './actions/TagContentActions';
import UserStoryActions from './actions/UserStoryActions';
import AuthSidebarActions from './actions/AuthSidebarActions';
import CommentsBlockActions from './actions/CommentsBlockActions';
import AuthMessageBoxActions from './actions/AuthMessageBoxActions';

import AppStore from './stores/AppStore';
import ContentStore from './stores/ContentStore';
import TagsStore from './stores/TagsStore';
import TagContentStore from './stores/TagContentStore';
import UserStoryStore from './stores/UserStoryStore';
import LogoStore from './stores/LogoStore';
import AuthSidebarStore from './stores/AuthSidebarStore';
import CommentsBlockStore from './stores/CommentsBlockStore';
import AuthMessageBoxStore from './stores/AuthMessageBoxStore';

import axios from 'axios';
import config from '../config.js';

try {
  const NODE_ENV = process.env.NODE_ENV || window.__ENV__;

  axios.defaults.baseURL = config[NODE_ENV].API_HOST;
  console.log('ENV', NODE_ENV);
  console.log('API server:', axios.defaults.baseURL)
} catch( e ) {
  console.log('ENV variable doesn\'t set');
}

export default class Flux extends Alt {
  constructor() {
    super();

    this.createActions( AppActions );
    this.createActions( TagsActions );
    this.createActions( TagContentActions );
    this.createActions( ContentActions );
    this.createActions( UserStoryActions );
    this.createActions( AuthSidebarActions, this );
    this.createActions( CommentsBlockActions, this );
    this.createActions( AuthMessageBoxActions );

    this.createStore( AppStore, 'AppStore' );
    this.createStore( TagsStore, 'TagsStore' );
    this.createStore( TagContentStore, 'TagContentStore' );
    this.createStore( ContentStore, 'ContentStore' );
    this.createStore( UserStoryStore, 'UserStoryStore' );
    this.createStore( LogoStore, 'LogoStore' );
    this.createStore( AuthSidebarStore, 'AuthSidebarStore' );
    this.createStore( CommentsBlockStore, 'CommentsBlockStore' );
    this.createStore( AuthMessageBoxStore, 'AuthMessageBoxStore');
  }
}
