import React from 'react';
import { useSelector } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';

// Local
import Avatar from '../Avatar';

import Logout from '../Logout';

import { selectUser } from '../../redux/user';

import { truncate } from '../../utils';

import useStyles from './styles';

const UserControl = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        onClick={handleMenuOpen}
      >
        <Avatar
          linkable={false}
          size={40}
          user={user}
        />
        <div className={classes.container}>
          <div className={classes.userAndSlug}>
            <Typography className={`${classes.displayName} ${classes.text}`}>
              {truncate(user.display_name, 16)}
            </Typography>
            <Typography
              className={classes.text}
              color="textSecondary"
            >
              {`@${user.slug}`}
            </Typography>
          </div>
          <MoreVertIcon className={classes.icon} />
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        classes={{ list: classes.muiMenuList }}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <div className={classes.menuHeader}>
          <Avatar
            size={50}
            user={user}
          />
          <div className={classes.userAndSlug}>
            <Typography className={`${classes.displayName} ${classes.text}`}>
              {user.display_name}
            </Typography>
            <Typography
              className={classes.text}
              color="textSecondary"
            >
              {`@${user.slug}`}
            </Typography>
          </div>
        </div>
        <Logout handleMenuClose={handleMenuClose} />
      </Menu>
    </>
  );
};

export default UserControl;
