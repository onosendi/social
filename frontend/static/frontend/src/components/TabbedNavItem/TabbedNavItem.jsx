import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';

// Local
import useStyles from './styles';

const TabbedNavItem = ({ active, children, to }) => {
  const classes = useStyles(active);

  return (
    <Button
      className={classes.root}
      color="primary"
      component={Link}
      to={to}
    >
      {children}
    </Button>
  );
};

TabbedNavItem.defaultProps = {
  active: false,
};

TabbedNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default TabbedNavItem;
