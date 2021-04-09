import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cancelButton: {
    textAlign: 'center',
    fontSize: '12px',
    width: '71px',
    height: '40px',
    background: '#FFFFFF',
    border: '2px solid #074EE8',
    boxSizing: 'border-box',
    borderRadius: '4px',
    color: '#074EE8',
  },
}));

export default function RatingModal({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Grid style={modalStyle} className={classes.paper}>
        <h2 id='simple-modal-title'>Text in a modal</h2>
        <p id='simple-modal-description'>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        <Button onClick={toggleModal} className={classes.cancelButton}>
          Cancel
        </Button>
      </Grid>
    </Modal>
  );
}
