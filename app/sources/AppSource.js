import axios from 'axios';

var AppSource = function( flux ){
  return {
    fetchToken: function () {
      return {
        remote: function( state, flux ) {
          flux.getActions('AppActions').startLoading();

          const URL = '/oauth/token';
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
