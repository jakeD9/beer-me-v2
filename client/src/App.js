import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from '../src/containers/LandingPage/LandingPage';
import Dashboard from '../src/containers/Dashboard/Dashboard';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={LandingPage} /> */}
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={SignUp}/>
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>

  );
}

export default App;
