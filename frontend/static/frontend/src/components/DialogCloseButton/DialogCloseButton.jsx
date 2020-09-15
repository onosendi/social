import React from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

// Local
import useStyles from './styles';

const DialogCloseButton = ({ ...props }) => {
  const classes = useStyles();

  return (
    <IconButton
      classes={{ root: classes.button }}
      color="primary"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default DialogCloseButton;
