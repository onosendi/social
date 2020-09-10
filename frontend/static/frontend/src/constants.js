export const APP_NAME = 'Social';
export const IS_HANDHELD = 'ontouchstart' in document.documentElement;

// Routing
export const route = {
  login: '/login/',
  followers: (slug) => `/users/${slug}/followers/`,
  following: (slug) => `/users/${slug}/following/`,
  home: '/home/',
  index: '/',
  notifications: '/notifications/',
  postDetail: (postId) => `/post/${postId}/`,
  postLikes: (postId) => `/post/${postId}/likes/`,
  postDetailLikes: (postId, slug) => `/post/${postId}/likes/`,
  profilePosts: (slug) => `/users/${slug}/`,
  profileLikes: (slug) => `/users/${slug}/likes/`,
  profileReplies: (slug) => `/users/${slug}/replies/`,
  recommendedPosts: '/recommended-posts/',
  recommendedUsers: '/recommended-users/',
  register: '/register/',
  search: '/search/',
  settings: '/settings/',
};
