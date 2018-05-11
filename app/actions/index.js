export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export const APP_DATA = 'APP_DATA';
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const REQUEST_STORY = 'REQUEST_STORY';
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';
export const SHOW_PAGINATION = 'SHOW_PAGINATION';
export const HIDE_PAGINATION = 'SHOW_PAGINATION';

export const requestStoriesAC = (query, offset) => ({ type: REQUEST_STORIES, payload: {query, offset} });
export const requestStoryAC = (id) => ({ type: REQUEST_STORY, payload: {id} });

export const updateRouterState = (state) => action(UPDATE_ROUTER_STATE, { state });
export const navigate = (pathname) => action(NAVIGATE, { pathname });


export const getLogoNumber = (state) => state.app.get('logoNumber');
