import { Button, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../interfaces';

const useStyles = makeStyles({
  header: {
    color: '#074EE8',
  },
  card: {
    border: '2px solid #AAAAAA',
    boxSizing: 'border-box',
    borderRadius: '8px',
    width: '350px',
    height: '150px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  button: {
    padding: '0px 12px',
    width: '66px',
    height: '32px',
    background: '#074EE8',
    borderRadius: '32px',
    color: '#FFFFFF',
  },
  professorName: {
    color: '#074EE8',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const Courses: FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  async function getAllCourses() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/courses`);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  return loading ? (
    <div>Loading data</div>
  ) : (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Typography className={classes.header} variant='h3'>
        Courses
      </Typography>
      <Grid container justify='center' spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id}>
            <Link style={{ textDecoration: 'none' }} to={'courses/' + course.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container direction='row' justify='space-between' alignItems='center'>
                    {course.name}
                    <Button className={classes.button}>{course.department}</Button>
                  </Grid>
                  <Grid container spacing={2}>
                    {course.ratings.slice(0, 2).map((rating) => (
                      <Grid className={classes.ratingContainer} item xs={6} key={rating.id}>
                        <Typography className={classes.professorName}>
                          {rating.professor}
                        </Typography>
                        <Typography>{rating.rating}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Courses;
