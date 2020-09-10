import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import BackButton from '../../components/BackButton';
import FollowNav from '../../components/FollowNav';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import NextButton from '../../components/NextButton';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import UserList from '../../components/UserList';
import UserSlug from '../../components/UserSlug';

import { route } from '../../constants';

import useProfileUser from '../../hooks/useProfileUser';
import useUI from '../../hooks/useUI';

import { getFollowing, key, selectFollowing } from '../../redux/profile';
import { selectUser } from '../../redux/user';

const Following = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const following = useSelector((s) => selectFollowing(s, slug));
  const user = useSelector(selectUser);

  const { profileUser, profileUserLoading } = useProfileUser(slug);
  const { fetched, loading, nextLoading } = useUI(
    key.following(slug), key.followingNext(slug),
  );

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getFollowing(slug));
    }
  }, [slug]);

  const handleNext = () => {
    dispatch(getFollowing(slug, following.next));
  };

  const render = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (following.results.length) {
      rendered = <UserList list={following.results} />;
    } else {
      rendered = (
        user.slug === slug
          ? (
            <NoData>
              <Typography
                paragraph
                variant="h6"
              >
                You aren&apos;t following anyone
              </Typography>
              <Typography
                color="textSecondary"
                paragraph
                variant="body2"
              >
                When you follow someone they&apos;ll show up here.
              </Typography>
              <Button
                color="primary"
                component={Link}
                to={route.recommendedUsers}
                variant="contained"
              >
                Explore
              </Button>
            </NoData>
          ) : (
            <NoData>
              <Typography
                paragraph
                variant="h6"
              >
                {profileUser.display_name || slug}
                {' '}
                isn&apos;t following anyone
              </Typography>
              <Typography
                color="textSecondary"
                paragraph
                variant="body2"
              >
                When
                {' '}
                {profileUser.display_name || slug}
                {' '}
                starts following someone they&apos;ll show up here.
              </Typography>
            </NoData>
          )
      );
    }
    return rendered;
  };

  return (
    <>
      <PageTitle
        title={`People followed by ${profileUser.display_name || slug}`}
      />

      <AuthLayout>
        <Heading>
          <BackButton />
          <div>
            <Typography variant="h6">
              {profileUser.display_name || slug}
            </Typography>
            {!profileUserLoading
              && (
                <UserSlug profileUser={profileUser} />
              )}
          </div>
        </Heading>
        <FollowNav
          active="following"
          slug={slug}
        />
        {render()}
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={following.next}
        />
      </AuthLayout>
    </>
  );
};

export default Following;
