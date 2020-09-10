import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import Avatar from '../Avatar';
import TextLink from '../TextLink';

import { route } from '../../constants';

import useStyles from './styles';

const PostHeader = ({ post, repost }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <div className={classes.header}>
      {repost
        && (
          <Avatar
            className={classes.headerAvatar}
            size={20}
            user={post.author}
          />
        )}
      <TextLink
        bold
        className={classes.headerItem}
        to={route.profilePosts(post.author.slug)}
      >
        {post.author.display_name}
      </TextLink>
      <Typography
        className={classes.headerItem}
        color="textSecondary"
        component="span"
      >
        {`@${post.author.slug}`}
        {' - '}
        {dayjs(post.created_at).fromNow()}
      </Typography>
    </div>
  );
};

PostHeader.defaultProps = {
  repost: false,
};

PostHeader.propTypes = {
  repost: PropTypes.bool,
  post: PropTypes.shape({
    author: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostHeader;
