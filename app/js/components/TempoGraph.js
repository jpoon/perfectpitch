'use strict';

import ClassNames           from 'classnames';
import React                from 'react';
import _                    from 'lodash';
import {Line as LineChart}  from 'react-chartjs';


const TempoGraph = React.createClass({
  sampleWindowInSec: 2,

  getInitialState() {
    return {
      windowTempo: [],
      windowStartTime: [],
      windowStartWordCount: 0,
    }
  },

  componentWillReceiveProps(nextProps) {
    var takeSample = true;

    if (this.state.windowStartWordCount == 0) {
      // start sampling window
      this.setState({
        windowStartTime: this.state.windowStartTime.concat([new Date().getTime() / 1000]),
        windowStartWordCount: _.words(nextProps.transcript).length,
      });

      return;
    }

    var elapsedTimeInSec = Math.floor(new Date().getTime()/1000 - _.last(this.state.windowStartTime));

    if (elapsedTimeInSec < this.sampleWindowInSec ) {
      // still sampling
      return;
    }

    var wordCntTotal = _.words(nextProps.transcript).length;
    var wordCntDelta = wordCntTotal - this.state.windowStartWordCount;

    var tempo = Math.floor(wordCntDelta * 60 / elapsedTimeInSec)

    this.setState({
      windowTempo: this.state.windowTempo.concat([tempo]),
      windowStartTime: this.state.windowStartTime.concat([new Date().getTime() / 1000]),
      windowStartWordCount: wordCntTotal,
    });

  },

  render() {
    var first = _.first(this.state.windowStartTime);

    var chartData = {
      labels: _.slice(this.state.windowStartTime.map(t => { return Math.round(t - first); }), 1, -1),
      datasets: [
          {
              labels: "tempo",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: this.state.windowTempo,
          },
      ]
    };

    var chartOptions = {
      responsive: true,
      scaleShowVerticalLines: false,
    }

    return (
      <div>
        <h2>Tempo</h2>
          { this.state.windowTempo.length > 0 ?
           <LineChart data={chartData} options={chartOptions} redraw /> : null
          }
      </div>
    );
  }

});

export default TempoGraph;
