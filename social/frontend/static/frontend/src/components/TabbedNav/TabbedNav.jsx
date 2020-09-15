import PropTypes from 'prop-types';
import React from 'react';

// Local
import useStyles from './styles';

const TabbedNav = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

TabbedNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabbedNav;
