import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Local
import { route } from '../../constants';

import AnonymousRoute from '../AnonymousRoute';
import AuthRoute from '../AuthRoute';

const Followers = React.lazy(() => import('../../pages/Followers'));
const Following = React.lazy(() => import('../../pages/Following'));
const Home = React.lazy(() => import('../../pages/Home'));
const Index = React.lazy(() => import('../../pages/Index'));
const Login = React.lazy(() => import('../../pages/Login'));
const Notifications = React.lazy(() => import('../../pages/Notifications'));
const PageNotFound = React.lazy(() => import('../../pages/PageNotFound'));
const PostDetail = React.lazy(() => import('../../pages/PostDetail'));
const PostLikes = React.lazy(() => import('../../pages/PostLikes'));
const ProfilePosts = React.lazy(() => import('../../pages/ProfilePosts'));
const ProfileLikes = React.lazy(() => import('../../pages/ProfileLikes'));
const RecommendedPosts = React.lazy(() => (
  import('../../pages/RecommendedPosts')));
const RecommendedUsers = React.lazy(() => (
  import('../../pages/RecommendedUsers')));
const Register = React.lazy(() => import('../../pages/Register'));
const Search = React.lazy(() => import('../../pages/Search'));
const Settings = React.lazy(() => import('../../pages/Settings'));

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
