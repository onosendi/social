import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import SearchIcon from '@material-ui/icons/Search';
import TextsmsIcon from '@material-ui/icons/Textsms';

// Local
import IndexLoginForm from '../../components/IndexLoginForm';

import { APP_NAME, route } from '../../constants';

import useStyles from './styles';

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.indexLayout}>
      <main className={classes.mainContainer}>
        <IndexLoginForm />
        <div className={classes.content}>
          <TextsmsIcon
            className={classes.branding}
            color="primary"
          />
          <Typography variant="h4">
            See what&apos;s happening in the world right now
          </Typography>
          <div className={classes.ctaContainer}>
            <Typography className={classes.ctaItem}>
              Join
              {' '}
              {APP_NAME}
              {' '}
              today.
            </Typography>
            <Button
              className={classes.ctaItem}
              color="primary"
              component={Link}
              fullWidth
              to={route.register}
              variant="contained"
            >
              Register
            </Button>
            <Button
              className={classes.ctaItem}
              color="primary"
              component={Link}
              fullWidth
              to={route.login}
              variant="outlined"
            >
              Login
            </Button>
          </div>
        </div>
      </main>
      <aside className={classes.asideContainer}>
        <List className={classes.asideList}>
          <ListItem>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Follow your interests" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Hear what people are talking about" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ChatBubbleIcon />
            </ListItemIcon>
            <ListItemText primary="Join the conversation" />
          </ListItem>
        </List>
      </aside>
    </div>
  );
};

export default Index;
