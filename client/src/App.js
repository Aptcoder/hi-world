import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './context/auth';
import MenuBar from './components/MenuBar';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Container>
    <MenuBar />
    <Route component={Home} path="/" exact={true}/>
    <AuthRoute component={Register} path="/register" exact={true}/>
    <AuthRoute component={Login} path="/login" exact={true}/>
    <Route component={SinglePost} path="/posts/:postId" exact={true}/>
    </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
