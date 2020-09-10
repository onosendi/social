import { createSlice } from '@reduxjs/toolkit';

// Local
import api, { descriptor } from '../api';

import { setLoading, setToast, unsetLoading } from './ui';

const NAMESPACE = 'profile';

//
// Keys
//
export const key = {
  following: (slug) => `following_${slug}`,
  followingNext: (slug) => `followingNext_${slug}`,
  followers: (slug) => `followers_${slug}`,
  followersNext: (slug) => `followersNext_${slug}`,
  profileUser: (slug) => `profileUser_${slug}`,
};

//
// Slice
//
const initialState = {};

const profileSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setFollowers: (state, { payload }) => {
      const { data, slug } = payload;
      if (!state[slug]) { state[slug] = {}; }
      if (!state[slug].followers) {
        state[slug].followers = { results: [] };
      }
      state[slug].followers.next = data.next;
      state[slug].followers.results.push(...data.results);
    },
    setFollowing: (state, { payload }) => {
      const { data, slug } = payload;
      if (!state[slug]) { state[slug] = {}; }
      if (!state[slug].following) {
        state[slug].following = { results: [] };
      }
      state[slug].following.next = data.next;
      state[slug].following.results.push(...data.results);
    },
    setProfileData: (state, { payload }) => {
      const { data, slug } = payload;
      if (state[slug]) {
        state[slug].user.profile = { ...state[slug].user.profile, ...data };
      }
    },
    setProfileUser: (state, { payload }) => {
      const { slug } = payload;
      state[slug] = { ...state[slug], user: payload };
    },
  },
});

const { actions, reducer } = profileSlice;
export const {
  setFollowers,
  setFollowing,
  setProfileData,
  setProfileUser,
} = actions;
export default reducer;

//
// Selectors
//
export const selectFollowers = (state, slug) => {
  const user = state.profile[slug];
  if (user === undefined || user.followers === undefined) {
    return { count: 0, results: [] };
  }
  return user.followers;
};

export const selectFollowing = (state, slug) => {
  const user = state.profile[slug];
  if (user === undefined || user.following === undefined) {
    return { count: 0, results: [] };
  }
  return user.following;
};

export const selectProfileUser = (state, slug) => {
  const user = state.profile[slug];
  if (user === undefined || user.user === undefined) {
    return {};
  }
  return user.user;
};

//
// Side effects
//
export const getFollowers = (slug, nextUrl = null) => async (dispatch) => {
  let thisKey = key.followers(slug);
  if (nextUrl) {
    thisKey = key.followersNext(slug);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getFollowers(slug), nextUrl);
    dispatch(setFollowers({ data, slug }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getFollowing = (slug, nextUrl = null) => async (dispatch) => {
  let thisKey = key.following(slug);
  if (nextUrl) {
    thisKey = key.followingNext(slug);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getFollowing(slug), nextUrl);
    dispatch(setFollowing({ data, slug }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getUser = (slug) => async (dispatch) => {
  const thisKey = key.profileUser(slug);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getUser(slug));
    dispatch(setProfileUser(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
