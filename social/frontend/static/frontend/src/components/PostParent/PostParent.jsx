import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Local
import PostHeader from '../PostHeader';

import useStyles from './styles';

const PostParent = ({ className, post }) => {
  const classes = useStyles();

  return (
    <Paper
      classes={{ root: classes.parentContainer }}
      className={className}
      variant="outlined"
    >
      <PostHeader
        post={post}
        repost
      />
      <Typography>
        {post.body}
      </Typography>
    </Paper>
  );
};

PostParent.defaultProps = {
  className: null,
};

PostParent.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostParent;
