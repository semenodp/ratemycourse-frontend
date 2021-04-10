import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  ButtonGroup,
  Grid,
  FormGroup,
  Slider,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { Rating } from '../interfaces';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

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
  root: {
    width: 300,
  },
  buttonGroup: {
    justifyContent: 'flex-end',
  },
}));

export default function RatingModal({
  open,
  toggleModal,
  toggleLoading,
  addNewRating,
  courseName,
  courseID,
}: {
  open: boolean;
  toggleModal: () => void;
  toggleLoading: (value: boolean) => void;
  addNewRating: (rating: Rating) => void;
  courseName: string;
  courseID: string;
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [courseRating, setCourseRating] = useState(1);
  const [professorName, setProfessorName] = useState('');
  const [courseDifficulty, setCourseDifficulty] = useState(1);
  const [takeAgain, setTakeAgain] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTakeAgain(event.target.checked);
  };

  const handleProfessorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfessorName(event.target.value);
  };

  const handleChangeRating = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    setCourseRating(value as number);
  };

  const handleChangeDifficulty = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    setCourseDifficulty(value as number);
  };

  async function submitRating() {
    try {
      toggleLoading(true);
      const response = await axios.post(`http://localhost:5000/api/v1/ratings`, {
        professor: professorName,
        difficulty: courseDifficulty,
        rating: courseDifficulty,
        takeAgain: takeAgain,
        courseID: courseID,
      });
      let newRating = response.data;
      addNewRating(newRating);
      toggleLoading(false);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Grid style={modalStyle} className={classes.paper}>
        <h2 id='simple-modal-title'>Rate {courseName}</h2>
        <FormGroup>
          <Grid className={classes.root}>
            <Typography id='discrete-slider-custom' gutterBottom>
              Rate the course
            </Typography>
            <Slider
              value={courseRating}
              defaultValue={1}
              min={1}
              max={5}
              aria-labelledby='discrete-slider-custom'
              step={1}
              valueLabelDisplay='auto'
              marks={marks}
              onChange={handleChangeRating}
            />
          </Grid>
          <Grid className={classes.root}>
            <Typography id='discrete-slider-custom' gutterBottom>
              Difficulty
            </Typography>
            <Slider
              value={courseDifficulty}
              onChange={handleChangeDifficulty}
              defaultValue={1}
              min={1}
              max={5}
              aria-labelledby='discrete-slider-custom'
              step={1}
              valueLabelDisplay='auto'
              marks={marks}
            />
          </Grid>
          <Grid className={classes.root}>
            <Typography id='discrete-slider-custom' gutterBottom>
              Would you take the course again?
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={takeAgain} onChange={handleChange} name='yes' />}
              label='Yes'
            />
          </Grid>

          <Grid className={classes.root}>
            <Typography id='discrete-slider-custom' gutterBottom>
              Write in professor full name
            </Typography>
            <TextField
              value={professorName}
              id='outlined-basic'
              label='Professor name'
              variant='outlined'
              margin='dense'
              onChange={handleProfessorNameChange}
            />
          </Grid>
        </FormGroup>
        <ButtonGroup
          className={classes.buttonGroup}
          color='primary'
          aria-label='outlined primary button group'
        >
          <Button type='submit' onClick={submitRating} className={classes.cancelButton}>
            Submit
          </Button>
          <Button onClick={toggleModal} className={classes.cancelButton}>
            Cancel
          </Button>
        </ButtonGroup>
      </Grid>
    </Modal>
  );
}
