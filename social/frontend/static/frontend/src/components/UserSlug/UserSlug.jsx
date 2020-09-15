import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import { selectUser } from '../../redux/user';

import useStyles from './styles';

const UserSlug = ({ className, followsYou, profileUser }) => {
  const classes = useStyles();

  const user = useSelector(selectUser);

  return (
    <Typography
      className={`${classes.userSlug} ${className}`}
      variant="body2"
    >
      {`@${profileUser.slug}`}
      {followsYou && profileUser.following.includes(user.id)
        && (
          <span className={classes.followsYou}>
            Follows you
          </span>
        )}
    </Typography>
  );
};

UserSlug.defaultProps = {
  className: '',
  followsYou: true,
};

UserSlug.propTypes = {
  className: PropTypes.string,
  followsYou: PropTypes.bool,
  profileUser: PropTypes.shape({
    following: PropTypes.arrayOf(PropTypes.number),
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserSlug;
