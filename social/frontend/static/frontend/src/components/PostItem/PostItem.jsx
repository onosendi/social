import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI
import Badge from '@material-ui/core/Badge';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import MoreIcon from '@material-ui/icons/MoreOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RepeatIcon from '@material-ui/icons/Repeat';
import ReplyIcon from '@material-ui/icons/Reply';

// Local
import Avatar from '../Avatar';
import CircularProgress from '../CircularProgress';
import NextButton from '../NextButton';
import PostHeader from '../PostHeader';
import PostParent from '../PostParent';

import { route } from '../../constants';

import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import LikePost from '../LikePost';
import ReplyForm from '../ReplyForm';
import ReplyItem from '../ReplyItem';
import Repost from '../Repost';

import useUI from '../../hooks/useUI';

import {
  getReplies,
  key,
  selectPost,
  selectReplies,
} from '../../redux/post';

import useStyles from './styles';

const PostItem = ({ expandReplies, postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((s) => selectPost(s, postId));
  const replies = useSelector((s) => selectReplies(s, postId));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(expandReplies);

  const { fetched, loading, nextLoading } = useUI(
    key.replies(postId), key.repliesNext(postId), Boolean(expandReplies),
  );

  React.useEffect(() => {
    if (!fetched && expandReplies) {
      dispatch(getReplies(postId));
    }
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplies = async () => {
    if (!fetched) {
      await dispatch(getReplies(postId));
    }
    setExpanded(!expanded);
  };

  const handleNext = () => {
    dispatch(getReplies(postId, replies.next));
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.postAction}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        classes={{ list: classes.muiMenuList }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        {post.is_author
          && (
            <DeletePost
              setAnchorEl={setAnchorEl}
              postId={post.id}
              type="post"
            />
          )}
        {post.is_author
          && (
            <EditPost
              setAnchorEl={setAnchorEl}
              postId={post.id}
            />
          )}
        <MenuItem
          onClick={() => (
            history.push(route.postDetail(post.id))
          )}
        >
          <ListItemIcon>
            <MoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </MenuItem>
      </Menu>
      <div className={classes.postContainer}>
        <div className={classes.avatarContainer}>
          {post.parent && <RepeatIcon className={classes.repeatIcon} />}
          <Avatar user={post.author} />
        </div>
        <div className={classes.post}>
          {post.parent
            && (
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {post.author.display_name}
                {' '}
                reposted
              </Typography>
            )}
          <PostHeader post={post} />
          {post.body
            && (
              <Typography>
                {post.body}
              </Typography>
            )}
          {post.parent && <PostParent post={post.parent} />}
        </div>
      </div>
      <CardActions
        classes={{ root: classes.cardActionsRoot }}
        disableSpacing
      >
        <div className={classes.likeContainer}>
          <LikePost
            postId={post.id}
            size="default"
            type="post"
          />
        </div>
        <div className={classes.replyContainer}>
          <IconButton
            className={classes.replies}
            disabled={loading}
            onClick={handleReplies}
          >
            <Badge
              badgeContent={post.reply_ids?.length || 0}
              max={9999}
            >
              <ReplyIcon />
            </Badge>
            {loading && <CircularProgress />}
          </IconButton>
        </div>
        <div className={classes.repostContainer}>
          <Repost postId={postId} />
        </div>
      </CardActions>
      {expanded && !loading
        && (
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <CardContent
              className={classes.replyContent}
            >
              <NextButton
                callback={handleNext}
                loading={nextLoading}
                nextUrl={replies.next}
              />
              {replies.results.map((replyId) => (
                <ReplyItem
                  key={replyId}
                  replyId={replyId}
                />
              ))}
              <ReplyForm postId={postId} />
            </CardContent>
          </Collapse>
        )}
    </div>
  );
};

PostItem.defaultProps = {
  expandReplies: false,
};

PostItem.propTypes = {
  expandReplies: PropTypes.bool,
  postId: PropTypes.number.isRequired,
};

export default PostItem;
