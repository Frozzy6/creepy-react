export default function( props, flux ){
  const routes = props.router.routes;
  const route = routes[routes.length - 1];

  /* TODO: КАКОЙ ЖЕ ЭТО ОГРОМНЫЙ КОСТЫЛЬ */
  const PATHS = [
    {
      paths: [
        "/",
        "/stories",
        "/stories/:page",
        "/scary",
        "/scary/:page",
        "/random",
        "/story/:id"
      ],
      func: function(){
        const store = flux.getStore('ContentStore');
        console.log( props.routes );
        const token = props.routes[1].query;
        const params = props.router.params;
        const param = params.page || params.id;

        const promise = new Promise( async function ( resolve, reject ) {
          var bindedFetch = store.fetchStory.bind( store, token, param, flux );
          var data = null;
          try {
            resolve( await bindedFetch() );
          } catch ( e ){
            reject( e );
          }
        });

        return async function(){ return promise; };
      }
    },
    {
      paths: ["/tags"],
      func: function(){
        var store = flux.getStore('TagsStore');
        return store.fetchTags.bind(store, flux);
      }
    },
    {
      paths: ["/tags/:tag"],
      func: function(){
        const store = flux.getStore('TagContentStore');
        const tag = props.params.tag;

        return store.fetchTagContent.bind( store, tag );
      }
    }
  ];

  const getFuncByPath = function( path ){
    for ( let i = 0; i < PATHS.length; ++i ) {
      var rule = PATHS[ i ];
      if ( rule.paths.indexOf( path ) > -1 ){
        return rule.func();
      }
    }
  }

  const path = route.path;
  var awFunc = getFuncByPath( path );

  if ( awFunc ) {
    return awFunc;
  } else {
    return null;
  }
};
