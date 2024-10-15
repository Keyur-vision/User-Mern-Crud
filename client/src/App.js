import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Routing from './routing/Route.js';

function App() {

  return (
    <Fragment >
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <Routing />
    </Fragment>
  );
}

export default App;
