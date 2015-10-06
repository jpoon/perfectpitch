'use strict';

import React              from 'react/addons';
import {ListenerMixin}    from 'reflux';

import Header             from './components/Header';
import Footer             from './components/Footer';

const App = React.createClass({

  mixins: [ListenerMixin],

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
    });
  },

  render() {
    return (
      <div className="container">

        <Header />

        {this.renderChildren()}

        <Footer />

      </div>
    );
  }

});

export default App;