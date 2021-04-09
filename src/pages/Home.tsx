import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Home: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        color: 'blue',
      }}
    >
      <Typography variant='h3'>Can’t choose a course?</Typography>
      <Link href='/courses'>See rated courses and make a rational decision</Link>
    </div>
  );
};

export default Home;
