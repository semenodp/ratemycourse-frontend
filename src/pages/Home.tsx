import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

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
      <Typography variant='h3'>Can’t choose class?</Typography>
      <Typography variant='h5'>See rated course and make a rational decision</Typography>
    </div>
  );
};

export default Home;
