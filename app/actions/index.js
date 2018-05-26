/* Stories */
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const REQUEST_STORY = 'REQUEST_STORY';
export const REQUEST_RANDOM_STORY = 'REQUEST_RANDOM_STORY';
/* Pagination */
export const SHOW_PAGINATION = 'SHOW_PAGINATION';
export const HIDE_PAGINATION = 'SHOW_PAGINATION';
/* Dialog */
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';

export const requestStoriesAC = (query, offset) => ({ type: REQUEST_STORIES, payload: { query, offset } });
export const requestStoryAC = (token, id) => ({ type: REQUEST_STORY, payload: { token, id } });
export const openDialogAC = (content) => ({ type: SHOW_DIALOG, payload: { content } });
export const closeDialogAC = () => ({ type: HIDE_DIALOG });

export const getIsAppLoading = (state) => state.app.get('isLoading');
export const getCurrentUser = (state) => state.app.get('user');
export const getLogoNumber = (state) => state.app.get('logoNumber');
export const getDialogIsOpen = (state) => state.dialog.get('isOpen');
export const getDialogContent = (state) => state.dialog.get('content');
