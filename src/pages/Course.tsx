import { Button, Grid, makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Course, Rating } from '../interfaces';
import RatingModal from '../components/RatingModal';

const useStyles = makeStyles({
  button: {
    padding: '0px 12px',
    width: '145px',
    height: '48px',
    background: '#074EE8',
    borderRadius: '4px',
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  courseName: {
    color: '#074EE8',
  },
  wrapper: {
    paddingTop: '50px',
  },
  card: {
    borderBottom: '2px solid #AAAAAA',
    boxSizing: 'border-box',
    width: '350px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  upvoteButton: {
    padding: '0px 12px',
    width: '66px',
    height: '32px',
    background: '#074EE8',
    borderRadius: '32px',
    color: '#FFFFFF',
    fontSize: '12px',
  },
});

const CoursePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course>();

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleLoading = (value: boolean) => {
    setLoading(value);
  };

  async function getCourse() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/courses/${id}`);
      setCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCourse();
  }, []);

  function handleAddNewRating(rating: Rating) {
    if (course) {
      setCourse({
        ...course,
        ratings: [...course.ratings, rating],
      });
    }
  }

  function calculateAverageRating(ratings: Rating[] | undefined) {
    if (ratings && ratings.length > 0) {
      const avg = ratings.reduce((total, rating) => total + rating.rating, 0) / ratings.length;
      return Math.round((avg + Number.EPSILON) * 100) / 100;
    }
    return 0;
  }

  function calculateAverageDiff(ratings: Rating[] | undefined) {
    if (ratings && ratings.length > 0) {
      const avg = ratings.reduce((total, rating) => total + rating.difficulty, 0) / ratings.length;
      return Math.round((avg + Number.EPSILON) * 100) / 100;
    }
    return 0;
  }

  const upvoteRating = (ratingId: string) => async (event: any) => {
    toggleLoading(true);
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/ratings/${ratingId}/upvote`,
      {},
    );
    let updateRating = response.data;
    if (course) {
      setCourse({
        ...course,
        ratings: course.ratings.map((rating: Rating) => {
          if ((rating.id as string) === (ratingId as string)) {
            return updateRating as Rating;
          } else {
            return rating;
          }
        }),
      });
    }
    toggleLoading(false);
  };

  return loading ? (
    <div>Loading data</div>
  ) : (
    <Grid className={classes.wrapper}>
      <Grid container direction='row' justify='space-between'>
        <Grid>
          <Typography className={classes.courseName} variant='h3'>
            {course?.name}
          </Typography>
          <Grid container direction='column'>
            <Typography>{`Avg. Difficulty ${calculateAverageDiff(course?.ratings)}`}</Typography>
            <Typography>{`Avg. Rating ${calculateAverageRating(course?.ratings)}`}</Typography>
          </Grid>
        </Grid>
        <Button className={classes.button} onClick={toggleModal}>
          Rate it
        </Button>
      </Grid>
      <Grid container spacing={2}>
        {course?.ratings.map((rating) => (
          <Grid item key={rating.id}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                  Rating: {rating.rating}
                </Grid>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                  Difficulty: {rating.rating}
                </Grid>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                  Take again: {rating.takeAgain ? 'Yes' : 'No'}
                </Grid>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                  Professor: {rating.professor}
                </Grid>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                  Upvotes: {rating.upvotes}
                </Grid>
                <Button className={classes.upvoteButton} onClick={upvoteRating(rating.id)}>
                  Upvote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <RatingModal
        open={open}
        toggleModal={toggleModal}
        toggleLoading={toggleLoading}
        addNewRating={handleAddNewRating}
        courseName={course!.name}
        courseID={course!.id}
      />
    </Grid>
  );
};

export default CoursePage;
