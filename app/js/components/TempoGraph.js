'use strict';

import ClassNames       from 'classnames';
import React            from 'react';
import _                from 'lodash';

const TempoGraph = React.createClass({
  sampleWindowInSec: 10,

  getInitialState() {
    return {
      windowTempo: [],
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

    if (elapsedTimeInSec < this.sampleWindowInSec ) {
      // still sampling
      return;
    }

    var wordCntTotal = _.words(nextProps.transcript).length;
    var wordCntDelta = wordCntTotal - this.state.windowStartWordCount;

    var tempo = Math.floor(wordCntDelta * 60 / elapsedTimeInSec)

    this.setState({
      windowTempo: this.state.windowTempo.concat([tempo]),
      windowStartTime: new Date(),
      windowStartWordCount: wordCntTotal,
    });

  },

  render() {
    return (
      <div>
        <h2>Tempo</h2>
        <ul className="Uli">
        {this.state.windowTempo.map(function(value) {
            return <li>{value}</li>
        })}
        </ul>
      </div>
    );
  }

});

export default TempoGraph;
