import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// Local
import Avatar from '../Avatar';
import CircularProgress from '../CircularProgress';

import useUI from '../../hooks/useUI';

import { createPost, key } from '../../redux/post';
import { selectUser } from '../../redux/user';

import useStyles from './styles';

const PostForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [postText, setPostText] = React.useState('');

  const { loading } = useUI(key.post, null, false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPost(user.username, postText));
    setPostText('');
  };

  const handleChange = (event) => {
    setPostText(event.target.value);
  };

  return (
    <div className={classes.root}>
      <form
        className={classes.postForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={classes.avatarContainer}>
          <Avatar user={user} />
        </div>
        <div className={classes.textField}>
          <InputBase
            classes={{
              root: classes.inputBaseRoot,
            }}
            fullWidth
            multiline
            onChange={handleChange}
            placeholder="What's on your mind?"
            spellCheck
            value={postText}
          />
        </div>
        <div className={classes.submitButtonContainer}>
          <Button
            className={classes.submitButton}
            color="primary"
            disabled={loading || postText.trim().length === 0}
            type="submit"
            variant="contained"
          >
            Post
            {loading && <CircularProgress />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
