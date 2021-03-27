import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Course from './pages/Course';
import Courses from './pages/Courses';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
}

export default App;
