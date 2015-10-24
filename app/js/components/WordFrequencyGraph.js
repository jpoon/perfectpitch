'use strict';

import ClassNames       from 'classnames';
import React            from 'react/addons';
import _                from 'lodash';

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

    return _.sortBy(wordFrequency, "count").reverse();
  },

  render() {
    var wordFrequency = this._getWordFrequency(this.props.transcript);

    var rows = wordFrequency.map(function(el) {
      return (
        <p>{el.word} : {el.count}</p>
      );
    });

    return (
      <div>
        {{rows}}
      </div>
    );
  }

});

export default WordFrequencyGraph;
