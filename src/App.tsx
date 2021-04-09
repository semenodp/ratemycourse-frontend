import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import Home from './pages/Home';
import { styled } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import CoursePage from './pages/Course';

const Wrapper = styled(Container)({
  height: '100%',
});

function App() {
  return (
    <Router>
      <Wrapper>
        <Switch>
          <Route path='/courses/:id'>
            <CoursePage />
          </Route>
          <Route path='/courses'>
            <Courses />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
