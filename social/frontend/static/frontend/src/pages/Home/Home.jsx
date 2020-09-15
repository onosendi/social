import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import Heading from '../../components/Heading';
import MobileMenu from '../../components/MobileMenu';
import NextButton from '../../components/NextButton';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import Posts from '../../components/Posts';
import PostForm from '../../components/PostForm';

import useUI from '../../hooks/useUI';

import { getFeed, key, selectFeed } from '../../redux/post';

import { APP_NAME, route } from '../../constants';

const Home = () => {
  const dispatch = useDispatch();

  const feed = useSelector(selectFeed);

  const { fetched, loading, nextLoading } = useUI(key.feed, key.feedNext);

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getFeed());
    }
  }, []);

  const handleNext = () => {
    dispatch(getFeed(feed.next));
  };

  return (
    <>
      <PageTitle title="Home" />

      <AuthLayout>
        <Heading>
          <MobileMenu />
          <Typography variant="h6">
            Home
          </Typography>
        </Heading>
        <PostForm />
        <Posts
          loading={loading}
          posts={feed.results}
          noData={(
            <NoData>
              <Typography
                paragraph
                variant="h6"
              >
                Welcome to
                {' '}
                {APP_NAME}
                !
              </Typography>
              <Typography
                color="textSecondary"
                paragraph
                variant="body2"
              >
                This is the best place to see what&apos;s happening in your
                world. Find some people to follow and let&apos;s get started!
              </Typography>
              <Button
                color="primary"
                component={Link}
                to={route.recommendedUsers}
                variant="contained"
              >
                Let&apos;s go!
              </Button>
            </NoData>
          )}
        />
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={feed.next}
        />
      </AuthLayout>
    </>
  );
};

export default Home;
