import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Course from './pages/Course';
import Courses from './pages/Courses';
import Home from './pages/Home';

import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/courses/:id'>
            <Course />
          </Route>
          <Route path='/courses'>
            <Courses />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
