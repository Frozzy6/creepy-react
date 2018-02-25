import axios from 'axios';

import config from '../../config.js';
const NODE_ENV = process.env.NODE_ENV || window.__ENV__;
const API_HOST = config[NODE_ENV].API_HOST;

var AppSource = function( flux ){
  return {
    fetchToken: function () {
      return {
        remote: function( state, flux ) {
          console.log('deprecated?');
          flux.getActions('AppActions').startLoading();

          const URL = `${API_HOST}/oauth/token`;
          return axios.post(
            URL,
            {
              headers: { 'Content-Type': 'application/json'}
              data: {}
            })
            .then( response => response.data )
        },
        success: flux.getActions('AppActions').getTokenSuccess,
        error: flux.getActions('AppActions').getTokenFail,
        loading: flux.getActions('AppActions').getTokenLoading,
        shouldFetch(state) {
          return true
        }
      }
    }
  }
};

export default AppSource;
