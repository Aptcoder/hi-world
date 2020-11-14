import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
    <Container>
    <MenuBar />
    <Route component={Home} path="/" exact={true}/>
    <Route component={Register} path="/register" exact={true}/>
    <Route component={Login} path="/login" exact={true}/>
    </Container>
    </Router>
  );
}

export default App;
