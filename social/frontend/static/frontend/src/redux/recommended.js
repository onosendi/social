import { createSlice } from '@reduxjs/toolkit';

// Local
import api, { descriptor } from '../api';

import { setPostById } from './post';
import { setLoading, setToast, unsetLoading } from './ui';

import { reduceToIds } from '../utils';

const NAMESPACE = 'recommended';

//
// Keys
//
export const key = {
  longRecommendedPosts: 'longRecommendedPosts',
  longRecommendedPostsNext: 'longRecommendedPostsNext',
  longRecommendedUsers: 'longRecommendedUsers',
  longRecommendedUsersNext: 'longRecommendedUsersNext',
  recommendedPosts: 'recommendedPosts',
  recommendedUsers: 'recommendedUsers',
};

//
// Slice
//
const initialState = {
  longPosts: {
    results: [],
  },
  longUsers: {
    results: [],
  },
  posts: [],
  users: [],
};

const recommendedSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setLongPosts: (state, { payload }) => {
      state.longPosts.next = payload.next;
      state.longPosts.results.push(...reduceToIds(payload.results));
    },
    setLongUsers: (state, { payload }) => {
      state.longUsers.next = payload.next;
      state.longUsers.results.push(...payload.results);
    },
    setPosts: (state, { payload }) => { state.posts = payload; },
    setUsers: (state, { payload }) => { state.users = payload; },
  },
});

const { actions, reducer } = recommendedSlice;
export const {
  setLongPosts,
  setLongUsers,
  setPosts,
  setUsers,
} = actions;
export default reducer;

//
// Selectors
//
export const selectLongRecommendedPosts = (state) => (
  state.recommended.longPosts);

export const selectLongRecommendedUsers = (state) => (
  state.recommended.longUsers);

export const selectRecommendedPosts = (state) => state.recommended.posts;

export const selectRecommendedUsers = (state) => state.recommended.users;

//
// Side effects
//
export const getLongRecommendedPosts = (nextUrl = null) => async (dispatch) => {
  let thisKey = key.longRecommendedPosts;
  if (nextUrl) {
    thisKey = key.longRecommendedPostsNext;
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getLongRecommendedPosts, nextUrl);
    dispatch(setPostById(data));
    dispatch(setLongPosts(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getLongRecommendedUsers = (nextUrl = null) => async (dispatch) => {
  let thisKey = key.longRecommendedUsers;
  if (nextUrl) {
    thisKey = key.longRecommendedUsersNext;
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getLongRecommendedUsers, nextUrl);
    dispatch(setLongUsers(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getRecommendedPosts = () => async (dispatch) => {
  const thisKey = key.recommendedPosts;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getRecommendedPosts);
    dispatch(setPosts(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getRecommendedUsers = () => async (dispatch) => {
  const thisKey = key.recommendedUsers;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getRecommendedUsers);
    dispatch(setUsers(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
