import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import Heading from '../../components/Heading';
import MobileMenu from '../../components/MobileMenu';
import NextButton from '../../components/NextButton';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import Posts from '../../components/Posts';
import RecommendedNav from '../../components/RecommendedNav';

import useUI from '../../hooks/useUI';

import {
  key,
  getLongRecommendedPosts,
  selectLongRecommendedPosts,
} from '../../redux/recommended';

const RecommendedPosts = () => {
  const dispatch = useDispatch();

  const recommendedPosts = useSelector(selectLongRecommendedPosts);

  const { fetched, loading, nextLoading } = useUI(
    key.longRecommendedPosts, key.longRecommendedPostsNext, true,
  );

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getLongRecommendedPosts());
    }
  }, []);

  const handleNext = () => {
    dispatch(getLongRecommendedPosts(recommendedPosts.next));
  };

  return (
    <>
      <PageTitle title="Recommended posts" />

      <AuthLayout>
        <Heading>
          <MobileMenu />
          <Typography variant="h6">
            Recommended
          </Typography>
        </Heading>
        <RecommendedNav active="posts" />
        <Posts
          loading={loading}
          noData={(
            <NoData>
              <Typography
                paragraph
                variant="h6"
              >
                You don&apos;t have any recommended posts
              </Typography>
              <Typography
                color="textSecondary"
                paragraph
                variant="body2"
              >
                The posts of users you aren&apos;t following will show up here.
              </Typography>
            </NoData>
          )}
          posts={recommendedPosts.results}
        />
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={recommendedPosts.next}
        />
      </AuthLayout>
    </>
  );
};

export default RecommendedPosts;
