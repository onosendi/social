import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Local
import Header from '../Header';
import RecommendedUsers from '../RecommendedUsers';
import RecommendedPosts from '../RecommendedPosts';

import {
  getUnreadNotificationsCount,
  selectUnreadNotificationsCount,
} from '../../redux/notifications';

import useStyles from './styles';

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);

  React.useEffect(() => {
    if (!unreadNotificationsCount) {
      dispatch(getUnreadNotificationsCount());
    }
    const interval = setInterval(() => {
      dispatch(getUnreadNotificationsCount());
    }, 300000);

    return () => { clearInterval(interval); };
  }, []);

  return (
    <div className={classes.authLayout}>
      <div className={classes.headerContainer}>
        <Header />
      </div>
      <main className={classes.mainContainer}>
        {children}
      </main>
      <aside className={classes.asideContainer}>
        <RecommendedUsers />
        <RecommendedPosts />
      </aside>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
