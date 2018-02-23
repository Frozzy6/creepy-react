import axios from 'axios';
import ContentActions from '../actions/ContentActions';

//TODO: remove duplicate functions
var getStoriesByToken = function( token, offset, resolve, flux, reject ) {
  offset = offset || '';
  const totalRequest = '/stories/count';
  const url = '/stories/' + token +'/' + offset;

  const p1 = axios.get( totalRequest )
    .then( responce => responce.data )
    .then( data => flux.getActions('ContentActions').getTotalStories( data.count ) )
    .catch( e => reject(e));

  let _data = null;
  const p2 = axios.get( url )
    .then( response => response.data )
    .then( (data) => {
      flux.getActions('ContentActions').showPagination();
      _data = data;
    })
    .catch( e => reject(e));

  return Promise.all([p1,p2]).then( () => { resolve(_data)} ).catch(e => reject(e));
}

var APIRequests = {
  stories: function( offset, resolve, flux, reject ){
    return getStoriesByToken( 'latest', offset, resolve, flux, reject );
  },
  scary: function( offset, resolve, flux, reject  ){
    return getStoriesByToken( 'scary', offset, resolve, flux, reject );
  },
  story: function( id, resolve, flux, reject ){
    const url = '/stories/' + id;

    return axios( url )
      .then( response => [response.data] )
      .then( (data) => {flux.getActions('ContentActions').hidePagination(); return data;} )
      .then( (data) => { resolve(data); } )
      .catch( e => reject(e));
  },
  random: function( nul, resolve, flux, reject ){
    const url = '/stories/random';

    return axios.get( url )
      .then( response => [response.data] )
      .then( (data) => { flux.getActions('ContentActions').hidePagination(); return data; } )
      .then( (data) => { resolve(data) })
      .catch( e => reject(e));
  }
};

var ContentSource = function( flux ){
  return {
    fetchStory: function () {
      return {
        remote: function( state, token, param, flux ) {
          return new Promise( function( resolve, reject ){
            flux.getActions('AppActions').startLoading();
            APIRequests[token]( param, resolve, flux, reject );
          })
        },
        success: flux.getActions('ContentActions').getStoriesSuccess,
        error: flux.getActions('ContentActions').getStoriesFail,
        loading: flux.getActions('ContentActions').startLoading,
        shouldFetch(state) {
          return true
        }
      }
    }
  }
};

export default ContentSource;
