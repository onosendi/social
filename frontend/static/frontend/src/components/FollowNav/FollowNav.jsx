import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import TabbedNav from '../TabbedNav';
import TabbedNavItem from '../TabbedNavItem';

// Local
import { route } from '../../constants';

const FollowNav = ({ active, slug }) => (
  <TabbedNav>
    <TabbedNavItem
      active={active === 'following'}
      to={route.following(slug)}
    >
      Following
    </TabbedNavItem>
    <TabbedNavItem
      active={active === 'followers'}
      to={route.followers(slug)}
    >
      Followers
    </TabbedNavItem>
  </TabbedNav>
);

FollowNav.propTypes = {
  active: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default FollowNav;
