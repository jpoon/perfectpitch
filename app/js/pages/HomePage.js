'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import Recorder      from './../components/Recorder';


const HomePage = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <DocumentTitle title="PitchPerfect">
        <section className="home-page">

          <Recorder />

        </section>
      </DocumentTitle>
    );
  }

});

export default HomePage;
