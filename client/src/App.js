import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MenuWrapper from '../src/containers/MenuWrapper/MenuWrapper';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={SignUp}/>
      <Route exact path="/dashboard" component={MenuWrapper} />
    </Router>
  );
}

export default App;
