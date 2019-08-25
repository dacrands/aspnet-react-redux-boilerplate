import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import AddNote from './components/AddNote';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/addNote' component={AddNote} />
  </Layout>
);
