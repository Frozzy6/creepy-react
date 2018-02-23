const FETCH_KEY = 'fetch';

export default async function( alt, components, params, route ){
  const argsTable = {
    contentToken: () => route.query,
    contentParam: () => params.page || params.id,
    flux: () => alt,
    tagContentToken:  () => params.tag
  }

  let needs = components
    .filter( component => Object.keys(component).includes(FETCH_KEY) )
    .map( component => component[FETCH_KEY] )

  /* Concat all arrays into big one */
  needs = [].concat.apply([], needs);

  /* Empty need */
  if ( !needs || needs.length == 0) { return; }

  /* For each require for request data*/
  for ( let i = 0; i < needs.length; ++i ) {
    let need = needs[i];

    /* Get strore for save request data */
    let store = alt.getStore(need.storeName)

    /* Make args for request */
    let args = need.args.map( arg => argsTable[arg]() );

    /* Call function to get data. Profit */
    try {
      await store[need.fetch].apply(store, args)
    } catch (e)  {
      /* or not */
      console.error('error with request api', e );
    }
  }
};
