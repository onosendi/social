import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';

// Local
import CircularProgress from '../CircularProgress';

import useStyles from './styles';

const NextButton = ({ callback, loading, nextUrl }) => {
  const classes = useStyles();

  return nextUrl
    ? (
      <Button
        classes={{ root: classes.root }}
        color="primary"
        disabled={loading}
        onClick={callback}
      >
        Load more
        {loading && <CircularProgress />}
      </Button>
    ) : null;
};

NextButton.defaultProps = {
  loading: false,
  nextUrl: null,
};

NextButton.propTypes = {
  callback: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  nextUrl: PropTypes.string,
};

export default NextButton;
