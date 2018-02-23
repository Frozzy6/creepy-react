import axios from 'axios';

var TagContentSource = function( flux ){
  return {
    fetchTagContent: function () {
      return {
        remote: function( state, tag, flux ) {
          const URL_STORIES = '/stories/tag/' + encodeURIComponent(tag.trim());
          const TAG_INFO_URL = '/tags/info/' + encodeURIComponent(tag.trim());

          return Promise.all([
            axios.get(TAG_INFO_URL)
              .then( response => response.data ),
            axios.get(URL_STORIES)
              .then( response => response.data )
          ])
        },
        success: flux.getActions('TagContentActions').getStroriesByTagSuccess,
        error: flux.getActions('TagContentActions').getStroriesByTagFail,
        loading: flux.getActions('TagContentActions').getStoriesByTagLoading,
        shouldFetch(state) {
          return true
        }
      }
    }
  }
};

export default TagContentSource;
