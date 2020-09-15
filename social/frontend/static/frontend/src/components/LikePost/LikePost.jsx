import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

// Local
import CircularProgress from '../CircularProgress';

import useUI from '../../hooks/useUI';

import {
  createLike,
  key,
  removeLike,
  selectLiked,
  selectPost,
} from '../../redux/post';
import { selectUser } from '../../redux/user';

import useStyles from './styles';

const LikePost = ({ postId, size, type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const post = useSelector((s) => selectPost(s, postId));
  const isLiked = useSelector((s) => selectLiked(s, post.id, user.id));

  const { loading } = useUI(key.like(post.id), null, false);

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeLike(post.id, user.id));
    } else {
      dispatch(createLike(post.id, user.id));
    }
  };

  const renderLikeText = () => {
    const pluralizeOther = (length) => (length > 1 ? 'others' : 'other');
    const likedLength = post.liked.length;
    let result;
    if (likedLength > 0) {
      if (isLiked) {
        if (likedLength === 1) {
          result = `You liked this ${type}`;
        } else {
          const subLength = likedLength - 1;
          result = `Liked by you and ${subLength} ${pluralizeOther(subLength)}`;
        }
      } else {
        result = `Liked by ${likedLength} ${pluralizeOther(likedLength)}`;
      }
    } else {
      result = `Be the first to like this ${type}!`;
    }
    return result;
  };

  return (
    <>
      <IconButton
        className={classes.like}
        color={isLiked ? 'primary' : 'default'}
        disabled={loading}
        onClick={handleLike}
      >
        {isLiked
          ? <ThumbUpIcon fontSize={size} />
          : <ThumbUpOutlinedIcon fontSize={size} />}
        {loading && <CircularProgress />}
      </IconButton>
      <Typography
        className={classes.likeText}
        color="textSecondary"
        variant="body2"
      >
        {renderLikeText()}
      </Typography>
    </>
  );
};

LikePost.propTypes = {
  postId: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['post', 'reply']).isRequired,
};

export default LikePost;
