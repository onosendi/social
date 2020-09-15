import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';

// Local
import Avatar from '../Avatar';

import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import LikePost from '../LikePost';

import { route } from '../../constants';

import { selectPost } from '../../redux/post';

import useStyles from './styles';

const ReplyItem = ({ replyId }) => {
  const classes = useStyles();

  const reply = useSelector((s) => selectPost(s, replyId));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <Avatar
        className={classes.avatar}
        user={reply.author}
      />
      <div className={classes.textAndInteractContainer}>
        <div className={classes.textAndControl}>
          <div className={classes.text}>
            <MuiLink
              className={classes.displayName}
              color="primary"
              component={Link}
              to={route.profilePosts(reply.author.slug)}
              variant="body1"
            >
              {reply.author.display_name}
            </MuiLink>
            <Typography
              color="textSecondary"
              component="span"
            >
              {reply.body}
            </Typography>
          </div>
          {reply.is_author
            && (
              <div className={classes.control}>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                  }}
                  getContentAnchorEl={null}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                  }}
                >
                  <DeletePost
                    setAnchorEl={setAnchorEl}
                    postId={reply.id}
                    type="reply"
                  />
                  <EditPost
                    setAnchorEl={setAnchorEl}
                    postId={reply.id}
                  />
                </Menu>
              </div>
            )}
        </div>
        <div className={classes.likeContainer}>
          <LikePost
            postId={reply.id}
            size="small"
            type="reply"
          />
        </div>
      </div>
    </div>
  );
};

ReplyItem.propTypes = {
  replyId: PropTypes.number.isRequired,
};

export default ReplyItem;
