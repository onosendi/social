import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SearchIcon from '@material-ui/icons/Search';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

// Local
import Avatar from '../Avatar';
import TextLink from '../TextLink';

import { APP_NAME, route } from '../../constants';

import { selectUnreadNotificationsCount } from '../../redux/notifications';
import { logoutUser, selectUser } from '../../redux/user';

import useStyles from './styles';

const MobileMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
  const user = useSelector(selectUser);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Avatar
        className={classes.buttonAvatar}
        linkable={false}
        onClick={handleToggleDrawer}
        size={30}
        user={user}
      />
      <Drawer
        anchor="left"
        className={classes.drawer}
        open={drawerOpen}
        onClose={handleToggleDrawer}
      >
        <div className={classes.titleContainer}>
          <Typography
            className={classes.title}
            variant="h6"
          >
            {APP_NAME}
          </Typography>
          <IconButton
            color="primary"
            onClick={handleToggleDrawer}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.userInfoContainer}>
          <Avatar
            className={classes.avatar}
            size={35}
            user={user}
          />
          <Typography variant="subtitle2">
            {user.display_name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`@${user.slug}`}
          </Typography>
        </div>
        <div className={classes.followContainer}>
          <TextLink
            className={classes.follow}
            color="textSecondary"
            to={route.following(user.slug)}
            variant="body2"
          >
            <span className={classes.followCount}>
              {user.following.length}
            </span>
            {' '}
            Following
          </TextLink>
          <TextLink
            className={classes.follow}
            color="textSecondary"
            to={route.followers(user.slug)}
            variant="body2"
          >
            <span className={classes.followCount}>
              {user.followers.length}
            </span>
            {' '}
            Followers
          </TextLink>
        </div>
        <List className={classes.list}>
          <ListItem
            component={Link}
            button
            to={route.home}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={route.profilePosts(user.slug)}
          >
            <ListItemIcon>
              <PersonOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={route.notifications}
          >
            <ListItemIcon>
              <Badge
                badgeContent={unreadNotificationsCount}
                color="primary"
              >
                <NOutlinedIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={route.search}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={route.settings}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            className={classes.logout}
            button
            onClick={handleLogout}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MobileMenu;
