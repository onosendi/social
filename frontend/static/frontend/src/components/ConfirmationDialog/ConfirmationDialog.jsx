import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

// Local
import CircularProgress from '../CircularProgress';

import useStyles from './styles';

const ConfirmationDialog = ({
  buttontext,
  loading,
  onclickfalse,
  onclicktrue,
  title,
  text,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullWidth
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {title
        && (
          <Typography
            className={classes.title}
            variant="h6"
          >
            {title}
          </Typography>
        )}
      <Typography
        className={classes.text}
        color="textSecondary"
      >
        {text}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={onclickfalse}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          color="primary"
          disabled={loading}
          onClick={onclicktrue}
          variant="contained"
        >
          {buttontext}
          {loading && <CircularProgress />}
        </Button>
      </div>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = {
  loading: false,
};

ConfirmationDialog.propTypes = {
  buttontext: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onclickfalse: PropTypes.func.isRequired,
  onclicktrue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
