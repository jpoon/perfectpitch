'use strict';

import ClassNames       from 'classnames';
import React            from 'react';
import _                from 'lodash';

const TempoGraph = React.createClass({
  sampleWindowInSec: 10,

  getInitialState() {
    return {
      wordCount: [],
      sampleRate: [],
      windowStartTime: new Date(),
      windowStartWordCount: 0,
    }
  },

  componentWillReceiveProps(nextProps) {
    var takeSample = true;

    if (this.state.windowStartWordCount == 0) {
      // start sampling window
      this.setState({
        windowStartTime: new Date(),
        windowStartWordCount: _.words(nextProps.transcript).length,
      });

      return;
    }

    var elapsedTimeInSec = Math.floor((new Date().getTime() - this.state.windowStartTime.getTime()) / 1000)

    if (elapsedTimeInSec >= this.state.sampleWindowInSec ) {
      var wordCnt = _.words(this.props.transcript).length;

      var windowWordCnt = wordCnt - this.state.windowStartWordCount;

      t
      console.log(nextProps.transcript);
      console.log(this.props.transcript);

      this.setState({
        windowStartTime: new Date(),
        windowStartWordCount: _.words(nextProps.transcript).length,
      });

    }
  },

  render() {
    return (
      <div>
        <h2>Tempo</h2>
      </div>
    );
  }

});

export default TempoGraph;
