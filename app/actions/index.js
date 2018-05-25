/* Stories */
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const REQUEST_STORY = 'REQUEST_STORY';
export const REQUEST_RANDOM_STORY = 'REQUEST_RANDOM_STORY';
/* Pagination */
export const SHOW_PAGINATION = 'SHOW_PAGINATION';
export const HIDE_PAGINATION = 'SHOW_PAGINATION';
/* Dialog */
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const requestStoriesAC = (query, offset) => ({ type: REQUEST_STORIES, payload: {query, offset} });
export const requestStoryAC = (token, id) => ({ type: REQUEST_STORY, payload: {token, id} });

export const updateRouterState = (state) => action(UPDATE_ROUTER_STATE, { state });
export const navigate = (pathname) => action(NAVIGATE, { pathname });


export const getLogoNumber = (state) => state.app.get('logoNumber');
