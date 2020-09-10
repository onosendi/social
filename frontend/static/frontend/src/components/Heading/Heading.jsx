import PropTypes from 'prop-types';
import React from 'react';

// Local
import useStyles from './styles';

const Heading = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
