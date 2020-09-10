import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import LogoutIcon from '@material-ui/icons/ExitToApp';

// Local
import { logoutUser, selectUser } from '../../redux/user';

import useStyles from './styles';

const Logout = React.forwardRef((_, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <MenuItem
      className={classes.menuItem}
      onClick={handleLogout}
      ref={ref}
    >
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={`Logout out @${user.slug}`}
        primaryTypographyProps={{
          variant: 'body2',
        }}
      />
    </MenuItem>
  );
});

export default Logout;
