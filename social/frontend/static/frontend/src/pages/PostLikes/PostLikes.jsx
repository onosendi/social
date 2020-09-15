import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import BackButton from '../../components/BackButton';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import NextButton from '../../components/NextButton';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import PostDetailNav from '../../components/PostDetailNav';
import UserList from '../../components/UserList';

import useUI from '../../hooks/useUI';

import { getPostLikes, key, selectPostLikes } from '../../redux/post';

import useStyles from './styles';

const PostLikes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { postId } = useParams();

  const postLikes = useSelector((s) => selectPostLikes(s, postId));

  const { fetched, loading, nextLoading } = useUI(
    key.postLikes(postId), key.postLikesNext(postId),
  );

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getPostLikes(postId));
    }
  }, [postId]);

  const handleNext = () => {
    dispatch(getPostLikes(postId, postLikes.next));
  };

  const render = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (postLikes.results.length) {
      rendered = <UserList list={postLikes.results} />;
    } else {
      rendered = (
        <NoData>
          <Typography
            paragraph
            variant="h6"
          >
            Nobody has liked this post
          </Typography>
          <Typography
            color="textSecondary"
            paragraph
            variant="body2"
          >
            When someone likes this post they&apos;ll show up here.
          </Typography>
        </NoData>
      );
    }
    return rendered;
  };

  return (
    <>
      <PageTitle title="Post likes" />

      <AuthLayout>
        <Heading>
          <BackButton />
          <div>
            <Typography
              className={classes.heading}
              variant="h6"
            >
              Post likes
            </Typography>
          </div>
        </Heading>
        <PostDetailNav
          active="likes"
          postId={postId}
        />
        {render()}
        <NextButton
          callback={handleNext}
          loading={nextLoading}
          nextUrl={postLikes.next}
        />
      </AuthLayout>
    </>
  );
};

export default PostLikes;
