import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import TabbedNav from '../TabbedNav';
import TabbedNavItem from '../TabbedNavItem';

// Local
import { route } from '../../constants';

const PostDetailNav = ({ active, postId }) => (
  <TabbedNav>
    <TabbedNavItem
      active={active === 'post'}
      to={route.postDetail(postId)}
    >
      Post
    </TabbedNavItem>
    <TabbedNavItem
      active={active === 'likes'}
      to={route.postDetailLikes(postId)}
    >
      Likes
    </TabbedNavItem>
  </TabbedNav>
);

PostDetailNav.propTypes = {
  active: PropTypes.oneOf(['post', 'likes']).isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostDetailNav;
