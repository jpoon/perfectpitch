'use strict';

import React              from 'react';
import _                  from 'lodash';
import ClassNames         from 'classnames';
import {Bar as BarChart}  from 'react-chartjs';

const WordFrequencyGraph = React.createClass({
  minWordLength: 2,
  maxRefreshInSec: 1,
  numWordsToDisplay: 15,

  _getWordFrequency(sentence) {
    var self = this;

    var wordFrequencyTmp = {};
    var words = _.words(sentence);

    words.forEach(word => {
      word = word.trim().toLowerCase();

      if (word.length > self.minWordLength) {
        wordFrequencyTmp[word] = (wordFrequencyTmp[word] || 0)
        wordFrequencyTmp[word]++;
      }
    });

    var wordFrequency = [];
    _.forIn(wordFrequencyTmp, (value, key) => wordFrequency.push({ word: key, count: value}));

    return _.sortByOrder(wordFrequency, ['count', 'word'], ['desc', 'asc']);
  },

  getInitialState() {
    return { shouldComponentUpdate: true };
  },

  componentDidMount() {
    var self = this;
    this.timer = setInterval(() => self.setState({shouldComponentUpdate: true}), this.maxRefreshInSec * 1000);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.shouldComponentUpdate && nextProps.transcript != this.props.transcript) {
      this.state.shouldComponentUpdate = false;
      return true;
    }

    return false;;
  },

  render() {
    var wordFrequency = _.take(this._getWordFrequency(this.props.transcript), this.numWordsToDisplay);

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
          { wordFrequency.length > 0 ?
           <BarChart data={chartData} options={chartOptions} redraw /> : null
          }
      </div>
    );
  }

});

export default WordFrequencyGraph;
