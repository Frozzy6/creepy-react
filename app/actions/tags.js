// Action types
export const REQUEST_ALL_TAGS = 'REQUEST_ALL_TAGS';
export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';

// Action creators
export const receiveTags = (tags) => ({ type: RECEIVE_ALL_TAGS, tags });
export const requestTags = () => ({ type: REQUEST_ALL_TAGS });

// Selectors

export const types = {
  REQUEST_ALL_TAGS,
  RECEIVE_ALL_TAGS,
}

export const actions = {
  requestTags,
}

export const selectors = {

}