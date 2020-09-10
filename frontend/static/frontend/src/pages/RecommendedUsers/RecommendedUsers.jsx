import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import MobileMenu from '../../components/MobileMenu';
import NextButton from '../../components/NextButton';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import RecommendedNav from '../../components/RecommendedNav';
import UserList from '../../components/UserList';

import useUI from '../../hooks/useUI';

import {
  key,
  getLongRecommendedUsers,
  selectLongRecommendedUsers,
} from '../../redux/recommended';

const RecommendedUsers = () => {
  const dispatch = useDispatch();

  const recommendedUsers = useSelector(selectLongRecommendedUsers);

  const { fetched, loading, nextLoading } = useUI(
    key.longRecommendedUsers, key.longRecommendedUsersNext, true,
  );

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getLongRecommendedUsers());
    }
  }, []);

  const handleNext = () => {
    dispatch(getLongRecommendedUsers(recommendedUsers.next));
  };

  const render = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (recommendedUsers.results.length) {
      rendered = <UserList list={recommendedUsers.results} />;
    } else {
      rendered = (
        <NoData>
          <Typography
            paragraph
            variant="h6"
          >
            You don&apos;t have any recommended users
          </Typography>
          <Typography
            color="textSecondary"
            paragraph
            variant="body2"
          >
            The users you aren&apos;t following will show up here.
          </Typography>
        </NoData>
      );
    }
    return rendered;
  };

  return (
    <>
      <PageTitle title="Recommended users" />

      <AuthLayout>
        <Heading>
          <MobileMenu />
          <Typography variant="h6">
            Recommended
          </Typography>
        </Heading>
        <RecommendedNav active="users" />
        {render()}
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={recommendedUsers.next}
        />
      </AuthLayout>
    </>
  );
};

export default RecommendedUsers;
