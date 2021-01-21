export const SET_POSTS = 'SET_POSTS';
export const SELECT_SITES = 'SET_SITES';
export const SET_ALL_SITES = 'SET_ALL_SITES';
export const DELETE_SITE = 'DELETE_SITE';
export const ADD_POSTS = 'ADD_POSTS';
export const SET_LAST_SITES = 'SET_LAST_SITES';

export const CHANGE_MENU_DISPLAY = 'CHANGE_MENU_DISPLAY';
export const CHANGE_DELETE_DISPLAY = 'CHANGE_DELETE_DISPLAY';
export const CHANGE_WARNING_DISPLAY = 'CHANGE_WARNING_DISPLAY';

export const setPosts = (arr) => ({
  type: SET_POSTS,
  payload: arr,
});

export const addPosts = (arr) => ({
  type: ADD_POSTS,
  payload: arr,
});

export const selectSites = (arr) => ({
  type: SELECT_SITES,
  payload: arr,
});
export const setLastSites = (arr) => ({
  type: SET_LAST_SITES,
  payload: arr,
});
export const setAllSites = (arr) => ({
  type: SET_ALL_SITES,
  payload: arr,
});

export const changeMenu = (bool) => ({
  type: CHANGE_MENU_DISPLAY,
  payload: bool,
});
export const changeDelete = (bool) => ({
  type: CHANGE_DELETE_DISPLAY,
  payload: bool,
});
export const changeWarning = (int) => ({
  type: CHANGE_WARNING_DISPLAY,
  payload: int,
});

export const deleteSite = (obj) => ({
  type: DELETE_SITE,
  payload: obj,
});
