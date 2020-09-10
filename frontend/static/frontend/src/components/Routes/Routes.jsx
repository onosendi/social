import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Local
import { route } from '../../constants';

import AnonymousRoute from '../../components/AnonymousRoute';
import AuthRoute from '../../components/AuthRoute';

import Followers from '../../pages/Followers';
import Following from '../../pages/Following';
import Home from '../../pages/Home';
import Index from '../../pages/Index';
import Login from '../../pages/Login';
import Notifications from '../../pages/Notifications';
import PageNotFound from '../../pages/PageNotFound';
import PostDetail from '../../pages/PostDetail';
import PostLikes from '../../pages/PostLikes';
import ProfilePosts from '../../pages/ProfilePosts';
import ProfileLikes from '../../pages/ProfileLikes';
import RecommendedPosts from '../../pages/RecommendedPosts';
import RecommendedUsers from '../../pages/RecommendedUsers';
import Register from '../../pages/Register';
import Search from '../../pages/Search';
import Settings from '../../pages/Settings';

const Routes = () => (
  <Switch>
    <AnonymousRoute
      component={Index}
      exact
      path={route.index}
    />

    <AuthRoute
      component={Home}
      exact
      path={route.home}
    />

    <AuthRoute
      component={ProfilePosts}
      exact
      path={route.profilePosts(':slug')}
    />

    <AuthRoute
      component={ProfileLikes}
      exact
      path={route.profileLikes(':slug')}
    />

    <AuthRoute
      component={Followers}
      exact
      path={route.followers(':slug')}
    />

    <AuthRoute
      component={Following}
      exact
      path={route.following(':slug')}
    />

    <AuthRoute
      component={PostDetail}
      exact
      path={route.postDetail(':postId')}
    />

    <AuthRoute
      component={PostLikes}
      exact
      path={route.postLikes(':postId')}
    />

    <AuthRoute
      component={Search}
      exact
      path={route.search}
    />

    <AuthRoute
      component={Settings}
      exact
      path={route.settings}
    />

    <AuthRoute
      exact
      component={Notifications}
      path={route.notifications}
    />

    <AuthRoute
      exact
      component={RecommendedPosts}
      path={route.recommendedPosts}
    />

    <AuthRoute
      exact
      component={RecommendedUsers}
      path={route.recommendedUsers}
    />

    <AnonymousRoute
      component={Login}
      exact
      path={route.login}
    />

    <AnonymousRoute
      exact
      component={Register}
      path={route.register}
    />

    <Route path="*">
      <PageNotFound />
    </Route>
  </Switch>
);

export default Routes;
