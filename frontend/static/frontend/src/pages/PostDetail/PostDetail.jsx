import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import AuthLayout from '../../components/AuthLayout';
import BackButton from '../../components/BackButton';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import PageTitle from '../../components/PageTitle';
import PostDetailNav from '../../components/PostDetailNav';
import PostItem from '../../components/PostItem';

import useUI from '../../hooks/useUI';

import { getPostDetail, key, selectPost } from '../../redux/post';

import useStyles from './styles';

const PostDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { postId } = useParams();

  const post = useSelector((s) => selectPost(s, postId));

  const { fetched, loading } = useUI(key.postDetail(postId));

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getPostDetail(postId));
    }
  }, [postId]);

  const renderPost = () => {
    let renderedPost;
    if (loading) {
      renderedPost = <Loading />;
    } else if (post) {
      renderedPost = (
        <PostItem
          expandReplies
          postId={post.id}
        />
      );
    } else {
      renderedPost = 'Post does not exist';
    }
    return renderedPost;
  };

  return (
    <>
      <PageTitle title="Post detail" />

      <AuthLayout>
        <Heading>
          <BackButton />
          <div>
            <Typography
              className={classes.heading}
              variant="h6"
            >
              Post
            </Typography>
          </div>
        </Heading>
        <PostDetailNav
          active="post"
          postId={postId}
        />
        {renderPost()}
      </AuthLayout>
    </>
  );
};

export default PostDetail;
