import axios from 'axios';

var TagsSource = function( flux ){
  return {
    fetchTags: function () {
      return {
        remote: function( state, flux ) {
          flux.getActions('AppActions').startLoading();

          const URL = '/tags/all';
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
