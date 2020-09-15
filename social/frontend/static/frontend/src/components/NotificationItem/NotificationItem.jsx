import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/DeleteOutline';

// Local
import Avatar from '../Avatar';
import CircularProgress from '../CircularProgress';
import NotificationType from '../NotificationType';
import TextLink from '../TextLink';

import useUI from '../../hooks/useUI';

import {
  key,
  removeNotification,
} from '../../redux/notifications';

import { route } from '../../constants';

import useStyles from './styles';

const NotificationItem = ({ notification }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const { loading } = useUI(
    key.removeNotification(notification.id), null, false,
  );

  const handleRemove = () => {
    dispatch(removeNotification(notification.id));
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.removeButton}
        color="primary"
        disabled={loading}
        onClick={handleRemove}
      >
        <DeleteIcon
          color="primary"
          fontSize="small"
        />
        {loading && <CircularProgress />}
      </IconButton>
      <div className={classes.avatarContainer}>
        <Avatar user={notification.from_user} />
      </div>
      <div className={classes.notification}>
        <div className={classes.header}>
          <TextLink
            bold
            className={classes.headerItem}
            to={route.profilePosts(notification.from_user.slug)}
          >
            {notification.from_user.display_name}
          </TextLink>
          <Typography
            className={classes.headerItem}
            color="textSecondary"
            component="span"
          >
            {`@${notification.from_user.slug}`}
            {' - '}
            {dayjs(notification.created_at).fromNow()}
          </Typography>
        </div>
        <NotificationType notification={notification} />
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    from_user: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NotificationItem;
