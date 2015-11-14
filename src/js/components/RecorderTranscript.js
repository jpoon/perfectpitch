'use strict';

import ClassNames       from 'classnames';
import React            from 'react';

const RecorderTranscriptComponent = React.createClass({
  render() {
    return (
      <div>
        <textarea className="form-control" value={this.props.transcript} disabled='true' rows="5"/>
      </div>
    );
  }

});

export default RecorderTranscriptComponent;
