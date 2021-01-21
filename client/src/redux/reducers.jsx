import { combineReducers } from 'redux';

import {
  SET_POSTS,
  SELECT_SITES,
  SET_ALL_SITES,
  CHANGE_MENU_DISPLAY,
  CHANGE_DELETE_DISPLAY,
  CHANGE_WARNING_DISPLAY,
  DELETE_SITE,
  ADD_POSTS,
  SET_LAST_SITES,
} from './actions';

const posts = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;
    case ADD_POSTS:
      return state.concat(action.payload);
    default:
      return state;
  }
};

const sites = (
  state = {
    all_sites: [],
    selected_sites: [],
    deleted_site: {},
    last_sites: [],
  },
  action
) => {
  switch (action.type) {
    case SELECT_SITES:
      return { ...state, selected_sites: action.payload };
    case DELETE_SITE:
      return { ...state, deleted_site: action.payload };
    case SET_ALL_SITES:
      return { ...state, all_sites: action.payload };
    case SET_LAST_SITES:
      return { ...state, last_sites: action.payload };
    default:
      return { ...state };
  }
};

const visible = (
  state = {
    menu: false,
    del: false,
    warning: 0,
  },
  action
) => {
  switch (action.type) {
    case CHANGE_MENU_DISPLAY:
      return { ...state, menu: action.payload };
    case CHANGE_DELETE_DISPLAY:
      return { ...state, del: action.payload };
    case CHANGE_WARNING_DISPLAY:
      return { ...state, warning: action.payload };
    default:
      return { ...state };
  }
};

const allReducers = combineReducers({
  sites,
  posts,
  visible,
});

export default allReducers;
