import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import MuiCircularProgress from '@material-ui/core/CircularProgress';

// Local
import useStyles from './styles';

const CircularProgress = (props) => {
  const { size, thickness, ...rest } = props;
  const classes = useStyles();

  return (
    <MuiCircularProgress
      className={classes.buttonProgress}
      size={size}
      thickness={thickness}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

CircularProgress.defaultProps = {
  size: 25,
  thickness: 5,
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
};

export default CircularProgress;
