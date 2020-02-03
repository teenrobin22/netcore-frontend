import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  user: null,
  users: null,
  pagination: null,
  error: null
};

const fetchUserInit = (state, action) => {
  return updateObject(state, { user: null, error: null });
};

const userProcessStart = (state, action) => {
  return updateObject(state, { error: null });
};

const userProcessSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null
  });
};

const userProcessFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const fecthUsersInit = (state, action) => {
  return updateObject(state, {
    user: null,
    users: null,
    error: null,
    pagination: null
  });
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { error: null });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    pagination: action.pagination,
    error: null
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_INIT:
      return fetchUserInit(state, action);
    case actionTypes.FETCH_USER_START:
      return userProcessStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return userProcessStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_START:
      return userProcessStart(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.DELETE_USER_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.DELETE_USER_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.DELETE_USER_PHOTO_FAIL:
      return userProcessFail(state, action);
    case actionTypes.SET_MAIN_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.SET_MAIN_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.SET_MAIN_PHOTO_FAIL:
      return userProcessFail(state, action);
    case actionTypes.FETCH_USERS_INIT:
      return fecthUsersInit(state, action);
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
