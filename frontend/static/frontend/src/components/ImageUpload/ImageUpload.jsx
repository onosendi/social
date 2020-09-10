import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

// Local
import DialogCloseButton from '../DialogCloseButton';

const pixelRatio = 4;

const ImageUpload = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        Upload image
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          <DialogCloseButton onClick={handleClose} />
          <Typography variant="h6">
            Repost
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUpload;
