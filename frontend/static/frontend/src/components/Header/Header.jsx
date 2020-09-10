import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// Material UI
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NIcon from '@material-ui/icons/Notifications';
import NOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TextsmsIcon from '@material-ui/icons/Textsms';

// Local
import DialogPostForm from '../DialogPostForm';
import UserControl from '../UserControl';

import { route } from '../../constants';

import { selectUnreadNotificationsCount } from '../../redux/notifications';
import { selectUser } from '../../redux/user';

import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  const location = useLocation();

  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
  const user = useSelector(selectUser);

  const active = (pathname) => location.pathname === pathname;

  return (
    <div className={classes.headerContainer}>
      <div className={classes.pushContainer}>
        <div className={classes.branding}>
          <IconButton
            color="primary"
            component={Link}
            to={route.home}
          >
            <TextsmsIcon />
          </IconButton>
        </div>
        <List
          className={classes.navList}
          component="nav"
        >
          <ListItem disableGutters>
            <Button
              color={active(route.home) ? 'primary' : 'default'}
              component={Link}
              size="large"
              startIcon={
                active(route.home)
                  ? <HomeIcon />
                  : <HomeOutlinedIcon />
              }
              to={route.home}
            >
              <span className="nav-button-text">Home</span>
            </Button>
          </ListItem>
          <ListItem disableGutters>
            <Button
              color={
                active(route.profilePosts(user.slug))
                  ? 'primary'
                  : 'default'
              }
              component={Link}
              size="large"
              startIcon={
                active(route.profilePosts(user.slug))
                  ? <PersonIcon />
                  : <PersonOutlinedIcon />
              }
              to={route.profilePosts(user.slug)}
            >
              <span className="nav-button-text">Profile</span>
            </Button>
          </ListItem>
          <ListItem disableGutters>
            <Button
              color={active(route.notifications) ? 'primary' : 'default'}
              component={Link}
              startIcon={(
                <Badge
                  badgeContent={unreadNotificationsCount}
                  color="primary"
                >
                  {active(route.notifications)
                    ? <NIcon />
                    : <NOutlinedIcon />}
                </Badge>
              )}
              size="large"
              to={route.notifications}
            >
              <span className="nav-button-text">Notifications</span>
            </Button>
          </ListItem>
          <ListItem disableGutters>
            <Button
              color={active(route.search) ? 'primary' : 'default'}
              component={Link}
              size="large"
              startIcon={<SearchIcon />}
              to={route.search}
            >
              <span className="nav-button-text">Search</span>
            </Button>
          </ListItem>
          <ListItem disableGutters>
            <Button
              color={active(route.settings) ? 'primary' : 'default'}
              component={Link}
              size="large"
              startIcon={
                active(route.settings)
                  ? <SettingsIcon />
                  : <SettingsOutlinedIcon />
              }
              to={route.settings}
            >
              <span className="nav-button-text">Settings</span>
            </Button>
          </ListItem>
        </List>
        <DialogPostForm />
      </div>
      <div className={classes.userControlContainer}>
        <UserControl />
      </div>
    </div>
  );
};

export default Header;
