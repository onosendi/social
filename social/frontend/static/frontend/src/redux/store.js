import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import notificationsSlice from './notifications';
import postSlice from './post';
import profileSlice from './profile';
import recommendedSlice from './recommended';
import searchSlice from './search';
import uiReducer from './ui';
import userSlice from './user';

const combinedReducers = combineReducers({
  notifications: notificationsSlice,
  post: postSlice,
  profile: profileSlice,
  recommended: recommendedSlice,
  search: searchSlice,
  ui: uiReducer,
  user: userSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    // eslint-disable-next-line no-param-reassign
    state = {};
  }
  return combinedReducers(state, action);
};

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;
