import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';

// Local
import useStyles from './styles';

const TextLink = ({
  bold,
  children,
  className,
  to,
  ...rest
}) => {
  const classes = useStyles(bold);

  return (
    <Typography
      classes={{ root: classes.root }}
      className={className}
      component={Link}
      to={to}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Typography>
  );
};

TextLink.defaultProps = {
  bold: false,
  className: null,
};

TextLink.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default TextLink;
