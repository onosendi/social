import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Material UI
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

import useProfileUser from '../../hooks/useProfileUser';
import useUI from '../../hooks/useUI';

import { getFollowers, key, selectFollowers } from '../../redux/profile';
import { selectUser } from '../../redux/user';

const Followers = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const followers = useSelector((s) => selectFollowers(s, slug));
  const user = useSelector(selectUser);

  const { profileUser, profileUserLoading } = useProfileUser(slug);
  const { fetched, loading, nextLoading } = useUI(
    key.followers(slug), key.followersNext(slug),
  );

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getFollowers(slug));
    }
  }, [slug]);

  const handleNext = () => {
    dispatch(getFollowers(slug, followers.next));
  };

  const render = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (followers.results.length) {
      rendered = <UserList list={followers.results} />;
    } else {
      rendered = (
        <NoData>
          <Typography
            paragraph
            variant="h6"
          >
            {user.slug === slug
              ? 'You aren\'t'
              : `${profileUser.display_name || slug} isn't`}
            {' '}
            followed by anyone
          </Typography>
          <Typography
            color="textSecondary"
            paragraph
            variant="body2"
          >
            When
            {' '}
            {user.slug === slug
              ? 'you\'re'
              : `${profileUser.display_name || slug} is`}
            {' '}
            followed by someone they&apos;ll show up here.
          </Typography>
        </NoData>
      );
    }
    return rendered;
  };

  return (
    <>
      <PageTitle
        title={`People following ${profileUser.display_name || slug}`}
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
          active="followers"
          slug={slug}
        />
        {render()}
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={followers.next}
        />
      </AuthLayout>
    </>
  );
};

export default Followers;
