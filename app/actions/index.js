import { isNull } from 'lodash';
/* App */
export const SET_LOGO_NUM = 'SET_LOGO_NUM';
/* Stories */
export const REQUEST_STORIES = 'REQUEST_STORIES';
export const REQUEST_STORY = 'REQUEST_STORY';
export const REQUEST_RANDOM_STORY = 'REQUEST_RANDOM_STORY';
export const REQUEST_LIKE = 'REQUEST_LIKE';
export const REQUEST_DISLIKE = 'REQUEST_DISLIKE';
/* Pagination */
export const SHOW_PAGINATION = 'SHOW_PAGINATION';
export const HIDE_PAGINATION = 'SHOW_PAGINATION';
/* Dialog */
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';
/* Auth */
export const REQUEST_AUTH = 'REQUEST_AUTH';
export const REQUEST_REG = 'REQUEST_REG';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const ADD_REGISTER_ERROR = 'ADD_REGISTER_ERROR';
/* TAGS */
export const REQUEST_STORIES_BY_TAG = 'REQUEST_STORIES_BY_TAG';
/* USERS */
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const REQUEST_USER_ADD_STORY = 'REQUEST_USER_ADD_STORY';


export const requestStoriesAC = (query, offset) => ({ type: REQUEST_STORIES, payload: { query, offset } });
export const requestStoryAC = (token, id) => ({ type: REQUEST_STORY, payload: { token, id } });
export const openDialogAC = content => ({
  type: SHOW_DIALOG,
  payload: { content },
});

export const setLogoNumAC = number => ({ type: SET_LOGO_NUM, payload: { number } });
export const closeDialogAC = () => ({ type: HIDE_DIALOG });
export const requestAuthAC = (login, password) => ({ type: REQUEST_AUTH, payload: { login, password } });
export const requestRegAC = payload => ({ type: REQUEST_REG, payload });
export const requestLogoutAC = () => ({ type: REQUEST_LOGOUT });
export const addRegisterErrorAC = error => ({ type: ADD_REGISTER_ERROR, payload: { error } });
export const requestStoriesByTagAC = tag => ({ type: REQUEST_STORIES_BY_TAG, payload: { tag } });
export const requestUserInfo = username => ({ type: REQUEST_USER_INFO, payload: { username } });
export const requestAddStoryAC = payload => ({ type: REQUEST_USER_ADD_STORY, payload });
export const requestLikeAC = uID => ({ type: REQUEST_LIKE, payload: { uID } });
export const requestDislikeAC = uID => ({ type: REQUEST_DISLIKE, payload: { uID } });

export const getLogoNumber = state => state.app.get('logoNumber');
export const getIsAppLoading = state => state.oauth.get('isLoading', false);
export const getCurrentUser = state => state.oauth.getIn(['auth', 'user', 'user'], null);
export const getCurrentOauthData = state => state.oauth.getIn(['auth', 'user'], null);
export const getAuthState = state => state.oauth.getIn(['auth', 'state']);
export const isUserAuthorized = state => !isNull(state.oauth.getIn(['auth', 'user'], null));
export const getRegisterError = state => state.oauth.getIn(['register', 'registerError']);
export const getRegisterState = state => state.oauth.getIn(['register', 'state']);
export const getTagsPerPage = state => state.stories.get('entries').flatMap(story => story.get('tags'));
export const getDialogIsOpen = state => state.dialog.get('isOpen');
export const getDialogContent = state => state.dialog.get('content');
export const getStoriesByTag = state => state.tags.get('stories');
export const getRequestUser = state => state.users.get('user');
export const getStory = state => state.stories.get('story');
export const getUserStoryState = state => state.users.getIn(['userStory', 'state']);
