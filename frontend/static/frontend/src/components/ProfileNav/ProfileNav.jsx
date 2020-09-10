import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import TabbedNav from '../TabbedNav';
import TabbedNavItem from '../TabbedNavItem';

// Local
import { route } from '../../constants';

const ProfileNav = ({ active, slug }) => (
  <TabbedNav>
    <TabbedNavItem
      active={active === 'posts'}
      to={route.profilePosts(slug)}
    >
      Posts
    </TabbedNavItem>
    <TabbedNavItem
      active={active === 'likes'}
      to={route.profileLikes(slug)}
    >
      Likes
    </TabbedNavItem>
  </TabbedNav>
);

ProfileNav.propTypes = {
  active: PropTypes.oneOf(['posts', 'likes']).isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProfileNav;
