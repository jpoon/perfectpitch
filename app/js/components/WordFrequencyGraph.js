'use strict';

import ClassNames       from 'classnames';
import React            from 'react';
import _                from 'lodash';
import Chartist         from 'react-chartist';
import createFragment   from 'react-addons-create-fragment';

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

    return _.sortByOrder(wordFrequency, ['count', 'word'], ['asc', 'desc']);
  },

  render() {
    var wordFrequency = this._getWordFrequency(this.props.transcript);

    console.log(wordFrequency);
    var data = {
      labels: _.pluck(wordFrequency, "word"),
      series: [_.pluck(wordFrequency, "count")],
    };

    var options = {
      horizontalBars: true,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value % 1 === 0 ? value : null;
        }
      },
      axisY: {
        showGrid: false,
      }
    };

    return (
      <div>
        <Chartist data={data} options={options} type='Bar' />
      </div>
    );
  }

});

export default WordFrequencyGraph;
