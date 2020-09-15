import PropTypes from 'prop-types';
import React from 'react';

// Local
import useStyles from './styles';

const NoData = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

NoData.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoData;
