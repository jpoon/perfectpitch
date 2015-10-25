'use strict';

import ClassNames       from 'classnames';
import React            from 'react';
import _                from 'lodash';
import {Bar as BarChart} from 'react-chartjs';

const WordFrequencyGraph = React.createClass({

  _getWordFrequency(sentence) {
    var wordFrequencyTmp = {};
    var words = _.words(sentence);

    words.forEach(function(word) {
      word = word.trim().toLowerCase();

      if (word.length > 2) {
        wordFrequencyTmp[word] = wordFrequencyTmp[word] || 0;
        wordFrequencyTmp[word]++;
      }
    });

    var wordFrequency = [];
    _.forIn(wordFrequencyTmp, function(value, key) {
      wordFrequency.push({ word: key, count: value});
    });

    return _.sortByOrder(wordFrequency, ['count', 'word'], ['desc', 'asc']);
  },

  getInitialState() {
    return { shouldComponentUpdate: true };
  },

  componentDidMount() {
    var self = this;
    this.timer = setInterval(function() {
      self.setState({shouldComponentUpdate: true})
    }, 750);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  shouldComponentUpdate(nextProps, nextState) {
    var shouldComponentUpdate = false

    if (nextProps.transcript != this.props.transcript) {
      shouldComponentUpdate = this.state.shouldComponentUpdate;
      this.state.shouldComponentUpdate = false;
    }

    return shouldComponentUpdate;
  },

  render() {
    var wordFrequency = this._getWordFrequency(this.props.transcript);

    var chartData = {
      labels: _.pluck(wordFrequency, "word"),
      datasets: [
          {
              label: "words",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: _.pluck(wordFrequency, "count")
          },
      ]
    };

    var chartOptions = {
      responsive: true,
      scaleShowVerticalLines: false,
    }

    return (
      <div>
        <h2>Word Frequency</h2>
         <BarChart data={chartData} options={chartOptions} redraw />
      </div>
    );
  }

});

export default WordFrequencyGraph;
