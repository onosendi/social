import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import notificationsSlice from './notifications';
import postSlice from './post';
import profileSlice from './profile';
import recommendedSlice from './recommended';
import searchSlice from './search';
import uiReducer from './ui';
import userSlice from './user';

const reducer = combineReducers({
  notifications: notificationsSlice,
  post: postSlice,
  profile: profileSlice,
  recommended: recommendedSlice,
  search: searchSlice,
  ui: uiReducer,
  user: userSlice,
});

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
});

export default store;
