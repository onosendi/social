import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';

// Local
import CircularProgress from '../CircularProgress';

import useUI from '../../hooks/useUI';

import {
  follow,
  key,
  selectFollowing,
  unfollow,
} from '../../redux/user';

const FollowButton = ({ className, user, size }) => {
  const dispatch = useDispatch();

  const following = useSelector((s) => selectFollowing(s, user.id));

  const { loading } = useUI(key.follow(user.id), null, false);

  const handleFollow = () => {
    if (following) {
      dispatch(unfollow(user.slug, user.id));
    } else {
      dispatch(follow(user.slug, user.id));
    }
  };

  return (
    <Button
      className={className}
      color="primary"
      disabled={loading}
      edge="end"
      onClick={handleFollow}
      size={size}
      variant="outlined"
    >
      {following ? 'Following' : 'Follow'}
      {loading && <CircularProgress />}
    </Button>
  );
};

FollowButton.defaultProps = {
  className: null,
  size: 'small',
};

FollowButton.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default FollowButton;
