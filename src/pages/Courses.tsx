import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface Course {
  id: string;
  name: string;
  department: string;
  required: boolean;
  // ratings: Rating[];
}

const Courses: FC = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  async function getAllCourses() {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/courses');
      setCourses(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  return loading ? (
    <div>Loading date</div>
  ) : (
    <div>
      {courses.map((course) => (
        <Link to={'courses/' + course.id}>
          <Card>
            <CardContent>
              {course.name} {course.department}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Courses;
