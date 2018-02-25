import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const API_HOST = config[NODE_ENV].API_HOST;

var TagsSource = function( flux ){
  return {
    fetchTags: function () {
      return {
        remote: function( state, flux ) {
          flux.getActions('AppActions').startLoading();

          const URL = `${API_HOST}/tags/all`;
          return axios.get( URL )
            .then( response => response.data )
        },
        success: flux.getActions('TagsActions').getTagsSuccess,
        error: flux.getActions('TagsActions').getTagsFail,
        loading: flux.getActions('TagsActions').tagsStartLoading,
        shouldFetch(state) {
          return true
        }
      }
    }
  }
};

export default TagsSource;
