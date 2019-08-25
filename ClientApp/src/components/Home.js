import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Note App</h1>
        <Link to={`/api/Notes`}> Notes </Link>
  </div>
);

export default connect()(Home);
