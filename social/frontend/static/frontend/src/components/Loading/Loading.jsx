import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';

// Local
import useStyles from './styles';

const Loading = ({ spacing }) => {
  const classes = useStyles(spacing);

  return (
    <div className={classes.root}>
      <CircularProgress
        size={25}
        thickness={5}
      />
    </div>
  );
};

Loading.defaultProps = {
  spacing: 3,
};

Loading.propTypes = {
  spacing: PropTypes.number,
};

export default Loading;
