'use strict';

import ClassNames       from 'classnames';
import React            from 'react/addons';
import _                from 'lodash';

const RecorderTranscriptComponent = React.createClass({
  _getWordFrequency(sentence) {
    var frequency = {};
    var words = _.words(sentence);

    words.forEach(function(word) {
      if (word.length >= 3) {
        word = word.trim().toLowerCase();
        frequency[word] = frequency[word] || 0;
        frequency[word]++;
      }
    })

    return frequency;
  },

  render() {
    var frequency = this._getWordFrequency(this.props.transcript);

    var rows = [];
    for (var word in frequency) {
      rows.push(<p>{word}: {frequency[word]}</p>);
    }
    return (
      <div>
        {{rows}}
      </div>
    );
  }

});

export default RecorderTranscriptComponent;
