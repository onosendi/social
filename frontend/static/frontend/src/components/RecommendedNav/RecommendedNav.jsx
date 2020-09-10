import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import TabbedNav from '../TabbedNav';
import TabbedNavItem from '../TabbedNavItem';

// Local
import { route } from '../../constants';

const RecommendedNav = ({ active }) => (
  <TabbedNav>
    <TabbedNavItem
      active={active === 'users'}
      to={route.recommendedUsers}
    >
      Users
    </TabbedNavItem>
    <TabbedNavItem
      active={active === 'posts'}
      to={route.recommendedPosts}
    >
      Posts
    </TabbedNavItem>
  </TabbedNav>
);

RecommendedNav.propTypes = {
  active: PropTypes.oneOf(['users', 'posts']).isRequired,
};

export default RecommendedNav;
