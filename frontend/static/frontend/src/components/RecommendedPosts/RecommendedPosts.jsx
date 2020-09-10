import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import RefreshIcon from '@material-ui/icons/Refresh';

// Local
import Avatar from '../Avatar';
import Loading from '../Loading';
import ShowMoreRecommended from '../ShowMoreRecommended';

import { route } from '../../constants';

import useUI from '../../hooks/useUI';

import {
  key,
  getRecommendedPosts,
  selectRecommendedPosts,
} from '../../redux/recommended';

import useStyles from './styles';

const RecommendedPosts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(selectRecommendedPosts);

  const { fetched, loading } = useUI(key.recommendedPosts);

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getRecommendedPosts());
    }
  }, []);

  const handleRefresh = () => {
    dispatch(getRecommendedPosts());
  };

  const renderPostsList = () => {
    let rendered;
    if (loading) {
      rendered = <Loading />;
    } else if (posts.length) {
      rendered = (
        <>
          <List
            className={classes.list}
            disablePadding
          >
            {posts.map((post) => (
              <ListItem
                alignItems="flex-start"
                key={post.id}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar
                    className={classes.avatar}
                    user={post.author}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={post.author.display_name}
                  primaryTypographyProps={{
                    className: classes.displayName,
                    component: Link,
                    to: route.profilePosts(post.author.slug),
                  }}
                  secondary={post.body}
                />
              </ListItem>
            ))}
          </List>
          <ShowMoreRecommended to={route.recommendedPosts} />
        </>
      );
    } else {
      rendered = (
        <Typography
          className={classes.noPosts}
          color="textSecondary"
          variant="body2"
        >
          No posts to show
        </Typography>
      );
    }
    return rendered;
  };

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        action={(
          <IconButton
            color="primary"
            className={classes.refreshButton}
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </IconButton>
        )}
        className={classes.cardHeader}
        title="Recent posts"
        titleTypographyProps={{
          className: classes.title,
          variant: 'body1',
        }}
      />
      {renderPostsList()}
    </Card>
  );
};

export default RecommendedPosts;
