import { createSlice } from '@reduxjs/toolkit';

// Local
import api, { descriptor } from '../api';

import { setLoading, setToast, unsetLoading } from './ui';

import { reduceById, reduceToIds } from '../utils';

const NAMESPACE = 'post';

//
// Keys
//
export const key = {
  editPost: 'editPost',
  feed: 'feed',
  feedNext: 'feedNext',
  like: (postId) => `like_${postId}`,
  post: 'post',
  postDetail: (postId) => `postDetail_${postId}`,
  postLikes: (postId) => `postLikes_${postId}`,
  postLikesNext: (postId) => `postLikesNext_${postId}`,
  profileLikes: (slug) => `profileLikes_${slug}`,
  profileLikesNext: (slug) => `profileLikesNext_${slug}`,
  profilePosts: (slug) => `profilePosts_${slug}`,
  profilePostsNext: (slug) => `profilePostsNext_${slug}`,
  removePost: 'removePost',
  replies: (postId) => `replies_${postId}`,
  repliesNext: (postId) => `repliesNext_${postId}`,
  reply: (parentId) => `reply_${parentId}`,
  repost: (parentId) => `repost_${parentId}`,
};

//
// Slice
//
const initialState = {
  feed: {
    count: 0,
    next: null,
    results: [],
  },
  postById: {},
  postLikes: {},
  profileLikes: {},
  profilePosts: {},
  repliesByPostId: {},
};

const postSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setEditPost: (state, { payload }) => {
      const { postId, body } = payload;
      state.postById[postId].body = body;
    },
    setFeed: (state, { payload }) => {
      state.feed.next = payload.next;
      state.feed.results.push(...reduceToIds(payload.results));
    },
    setLike: (state, { payload }) => {
      const { postId, userId } = payload;
      state.postById[postId].liked.push(userId);
    },
    setPost: (state, { payload }) => {
      state.feed.results = [payload.id, ...state.feed.results];
      const profile = state.profilePosts[payload.author.slug];
      if (profile) {
        state.profilePosts[payload.author.slug].results = [
          payload.id,
          ...profile.results,
        ];
      }
      // When creating a post, the payload returned from the server does not
      // include reply/repost IDs. Let's fake them here.
      const newPayload = {
        ...payload,
        reply_ids: [],
        repost_ids: [],
      };
      state.postById[payload.id] = newPayload;
    },
    setPostById: (state, { payload }) => {
      state.postById = { ...state.postById, ...reduceById(payload.results) };
    },
    setPostDetail: (state, { payload }) => {
      state.postById[payload.id] = payload;
    },
    setPostLikes: (state, { payload }) => {
      const { data, postId } = payload;
      if (!state.postLikes[postId]) {
        state.postLikes[postId] = { results: [] };
      }
      state.postLikes[postId].next = data.next;
      state.postLikes[postId].results.push(...data.results);
    },
    setProfileLikes: (state, { payload }) => {
      const { data, slug } = payload;
      if (!state.profileLikes[slug]) {
        state.profileLikes[slug] = { results: [] };
      }
      state.profileLikes[slug].next = data.next;
      state.profileLikes[slug].results.push(...reduceToIds(data.results));
    },
    setProfilePosts: (state, { payload }) => {
      const { data, slug } = payload;
      if (!state.profilePosts[slug]) {
        state.profilePosts[slug] = { results: [] };
      }
      state.profilePosts[slug].next = data.next;
      state.profilePosts[slug].results.push(...reduceToIds(data.results));
    },
    setReplies: (state, { payload }) => {
      const { data, postId } = payload;
      if (!state.repliesByPostId[postId]) {
        state.repliesByPostId[postId] = { results: [] };
      }
      // Reverse the array to simulate pagination at the end of the queryset.
      const results = reduceToIds(data.results);
      results.reverse();
      state.repliesByPostId[postId].next = data.next;
      state.repliesByPostId[postId].results = [
        ...results,
        ...state.repliesByPostId[postId].results,
      ];
    },
    setReply: (state, { payload }) => {
      state.postById[payload.id] = payload;
      state.repliesByPostId[payload.parent.id].results.push(payload.id);
    },
    unsetLike: (state, { payload }) => {
      const { postId, userId } = payload;
      const { liked } = state.postById[postId];
      state.postById[postId].liked = liked.filter((k) => k !== userId);
    },
    unsetPost: (state, { payload }) => {
      const { postId, slug } = payload;
      state.feed.results = state.feed.results.filter((id) => id !== postId);
      const profile = state.profilePosts[slug];
      if (profile) {
        const newIds = profile.results.filter((id) => id !== postId);
        state.profilePosts[slug].results = newIds;
      }
      delete state.postById[postId];
    },
    unsetReply: (state, { payload }) => {
      const { parentId, postId } = payload;
      const newIds = state.repliesByPostId[parentId].results.filter((id) => (
        id !== postId));
      state.repliesByPostId[parentId].results = newIds;
      delete state.postById[postId];
    },
  },
});

const { actions, reducer } = postSlice;
export const {
  setEditPost,
  setFeed,
  setLike,
  setPost,
  setPostLikes,
  setPostById,
  setPostDetail,
  setProfileLikes,
  setProfilePosts,
  setReplies,
  setReply,
  unsetLike,
  unsetPost,
  unsetReply,
} = actions;
export default reducer;

//
// Selectors
//
export const selectFeed = (state) => state.post.feed;

export const selectLiked = (state, postId, userId) => (
  state.post.postById[postId].liked.includes(userId));

export const selectPost = (state, postId) => state.post.postById[postId];

export const selectPostLikes = (state, postId) => {
  const postLikes = state.post.postLikes[postId];
  if (postLikes === undefined) {
    return { count: 0, results: [] };
  }
  return postLikes;
};

export const selectProfilePosts = (state, slug) => {
  const profilePosts = state.post.profilePosts[slug];
  if (profilePosts === undefined) {
    return { count: 0, results: [] };
  }
  return profilePosts;
};

export const selectProfileLikes = (state, slug) => {
  const profileLikes = state.post.profileLikes[slug];
  if (profileLikes === undefined) {
    return { count: 0, results: [] };
  }
  return profileLikes;
};

export const selectReplies = (state, postId) => {
  const replies = state.post.repliesByPostId[postId];
  if (replies === undefined) {
    return {};
  }
  return replies;
};

//
// Side effects
//
export const createLike = (postId, userId) => async (dispatch) => {
  const thisKey = key.like(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.createLike(postId));
    dispatch(setLike({ postId, userId }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createPost = (author, body) => async (dispatch) => {
  const thisKey = key.post;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.createPost({
      body,
      is_reply: false,
      parent_id: null,
    }));
    dispatch(setPost(data));
    dispatch(setToast('Post sent'));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createReply = (author, body, parentId) => async (dispatch) => {
  const thisKey = key.reply(parentId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.createPost({
      body,
      is_reply: true,
      parent_id: parentId,
    }));
    dispatch(setReply(data));
    dispatch(setToast('Reply sent'));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const createRepost = (author, body, parentId) => async (dispatch) => {
  const thisKey = key.repost(parentId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.createRepost({
      body,
      is_reply: false,
      parent_id: parentId,
    }));
    dispatch(setPost(data));
    dispatch(setToast('Repost sent'));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const editPost = (postId, body) => async (dispatch) => {
  const thisKey = key.editPost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.editPost(postId, body));
    dispatch(setEditPost({ postId, body }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getFeed = (nextUrl = null) => async (dispatch) => {
  let thisKey = key.feed;
  if (nextUrl) {
    thisKey = key.feedNext;
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getFeed, nextUrl);
    dispatch(setPostById(data));
    dispatch(setFeed(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getPostDetail = (postId) => async (dispatch) => {
  const thisKey = key.postDetail(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getPost(postId));
    dispatch(setPostDetail(data));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getPostLikes = (postId, nextUrl = null) => async (dispatch) => {
  let thisKey = key.postLikes(postId);
  if (nextUrl) {
    thisKey = key.postLikesNext(postId);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getPostLikes(postId), nextUrl);
    dispatch(setPostLikes({ data, postId }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getProfileLikes = (slug, nextUrl = null) => async (dispatch) => {
  let thisKey = key.profileLikes(slug);
  if (nextUrl) {
    thisKey = key.profileLikesNext(slug);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getProfileLikes(slug), nextUrl);
    dispatch(setPostById(data));
    dispatch(setProfileLikes({ data, slug }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getProfilePosts = (slug, nextUrl = null) => async (dispatch) => {
  let thisKey = key.profilePosts(slug);
  if (nextUrl) {
    thisKey = key.profilePostsNext(slug);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getProfilePosts(slug), nextUrl);
    dispatch(setPostById(data));
    dispatch(setProfilePosts({ data, slug }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getReplies = (postId, nextUrl) => async (dispatch) => {
  let thisKey = key.replies(postId);
  if (nextUrl) {
    thisKey = key.repliesNext(postId);
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getReplies(postId), nextUrl);
    dispatch(setPostById(data));
    dispatch(setReplies({ data, postId }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeLike = (postId, userId) => async (dispatch) => {
  const thisKey = key.like(postId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.removeLike(postId));
    dispatch(unsetLike({ postId, userId }));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removePost = (postId, slug) => async (dispatch) => {
  const thisKey = key.removePost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.removePost(postId));
    dispatch(unsetPost({ postId, slug }));
    dispatch(setToast('Post removed'));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeReply = (postId, parentId) => async (dispatch) => {
  const thisKey = key.removePost;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.removePost(postId));
    dispatch(unsetReply({ postId, parentId }));
    dispatch(setToast('Reply removed'));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
