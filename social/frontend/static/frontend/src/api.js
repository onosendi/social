import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const api = async (descriptor, nextUrl = null) => {
  const desc = descriptor;
  if (nextUrl) {
    desc.url = nextUrl;
  }
  const { data } = await axios(desc);
  return data;
};

export default api;

export const descriptor = {
  //
  // Post descriptors
  //
  createLike: (postId) => ({
    method: 'post',
    url: `/api/posts/${postId}/likes/`,
  }),

  createPost: (data) => ({
    data,
    method: 'post',
    url: '/api/posts/',
  }),

  createRepost: (data) => ({
    data,
    method: 'post',
    url: '/api/posts/repost/',
  }),

  editPost: (postId, body) => ({
    data: {
      body,
    },
    method: 'patch',
    url: `/api/posts/${postId}/`,
  }),

  getFeed: ({
    method: 'get',
    url: '/api/posts/feed/',
  }),

  getLikes: (postId) => ({
    method: 'get',
    url: `/api/posts/${postId}/likes/`,
  }),

  getPost: (postId) => ({
    method: 'get',
    url: `/api/posts/${postId}/`,
  }),

  getPostLikes: (postId) => ({
    method: 'get',
    url: `/api/posts/${postId}/likes/`,
  }),

  getPosts: ({
    method: 'get',
    url: '/api/posts/',
  }),

  getProfileLikes: (slug) => ({
    method: 'get',
    url: `/api/posts/profile/${slug}/likes/`,
  }),

  getProfilePosts: (slug) => ({
    method: 'get',
    url: `/api/posts/profile/${slug}/posts/`,
  }),

  getLongRecommendedPosts: ({
    method: 'get',
    url: '/api/posts/long-recommended-posts/',
  }),

  getRecommendedPosts: ({
    method: 'get',
    url: '/api/posts/recommended-posts/',
  }),

  getReplies: (postId) => ({
    method: 'get',
    url: `/api/posts/${postId}/replies/`,
  }),

  removeLike: (postId) => ({
    method: 'delete',
    url: `/api/posts/${postId}/likes/`,
  }),

  removePost: (postId) => ({
    method: 'delete',
    url: `/api/posts/${postId}/`,
  }),

  //
  // User descriptors
  //
  createFollow: (slug) => ({
    method: 'post',
    url: `/api/users/${slug}/following/`,
  }),

  createUser: (data) => ({
    data,
    method: 'post',
    url: '/api/users/auth/register/',
  }),

  editPassword: (data) => ({
    data,
    method: 'put',
    url: '/api/users/edit-password/',
  }),

  editProfile: (data) => ({
    data,
    method: 'patch',
    url: '/api/users/edit-profile/',
  }),

  editUser: (data) => ({
    data,
    method: 'patch',
    url: '/api/users/edit-user/',
  }),

  getCurrentUser: ({
    method: 'get',
    url: '/api/users/current-user/',
  }),

  getFollowers: (slug) => ({
    method: 'get',
    url: `/api/users/${slug}/followers/`,
  }),

  getFollowing: (slug) => ({
    method: 'get',
    url: `/api/users/${slug}/following/`,
  }),

  getLongRecommendedUsers: ({
    method: 'get',
    url: '/api/users/long-recommended-users/',
  }),

  getRecommendedUsers: ({
    method: 'get',
    url: '/api/users/recommended-users/',
  }),

  getUser: (slug) => ({
    method: 'get',
    url: `/api/users/${slug}/`,
  }),

  loginUser: (data) => ({
    data,
    method: 'post',
    url: '/api/users/auth/login/',
  }),

  logoutUser: ({
    method: 'post',
    url: '/api/users/auth/logout/',
  }),

  removeFollow: (slug) => ({
    method: 'delete',
    url: `/api/users/${slug}/following/`,
  }),

  //
  // Search descriptors
  //
  getSearch: (searchString) => ({
    method: 'get',
    url: `/api/search/?search=${searchString}`,
  }),

  //
  // Notifications descriptors
  //
  getNotifications: ({
    method: 'get',
    url: '/api/notifications/',
  }),

  getUnreadNotificationsCount: ({
    method: 'get',
    url: '/api/notifications/unread-count/',
  }),

  removeNotification: (notificationId) => ({
    method: 'delete',
    url: `/api/notifications/${notificationId}/`,
  }),
};
