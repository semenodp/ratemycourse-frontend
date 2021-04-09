import React from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Course: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>CourseID: {id}</div>;
};

export default Course;
