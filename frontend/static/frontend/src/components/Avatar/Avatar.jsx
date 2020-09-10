import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import MuiAvatar from '@material-ui/core/Avatar';

// Local
import { route } from '../../constants';

import useStyles from './styles';

const Avatar = ({
  className,
  linkable,
  size,
  user,
  ...rest
}) => {
  const classes = useStyles(size);

  return (linkable
    ? (
      <MuiAvatar
        alt={user.display_name}
        classes={{ root: classes.root }}
        className={className}
        component={Link}
        src={user.profile.image}
        to={route.profilePosts(user.slug)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    ) : (
      <MuiAvatar
        alt={user.display_name}
        classes={{ root: classes.root }}
        className={className}
        src={user.profile.image}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    )
  );
};

Avatar.defaultProps = {
  className: null,
  linkable: true,
  size: 50,
};

Avatar.propTypes = {
  className: PropTypes.string,
  linkable: PropTypes.bool,
  size: PropTypes.number,
  user: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      image: PropTypes.string,
    }).isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default Avatar;
