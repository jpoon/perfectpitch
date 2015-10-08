'use strict';

import ClassNames       from 'classnames';
import React            from 'react/addons';
import OxfordWebSocket  from '../utils/OxfordWebSocket';
import Recorder         from '../utils/Recorder';

const RecorderTranscriptComponent = React.createClass({
    handleTranscriptChange() {
        var value = this.refs.filterInput.getDOMNode().value;
        this.props.updateFilter(value);
    },

    getInitialState() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        var audioContext = null;
        if (AudioContext) {
            audioContext = new AudioContext();
        }
        this.audioContext = audioContext;

        this.audioRecorder = null;
        this.audioSource = null;
        this.oxfordWebSocket = new OxfordWebSocket();

        this.messageHistory = '';
        return {
            isRecording: false,
            message: '',
        };
    },

  render() {
    var message = this.state.message;

    var iconClasses = ClassNames({
        'fa': true,
        'fa-play': !this.state.isRecording,
        'fa-stop': this.state.isRecording,
    });

    var divStyle = {
        marginTop: '25px',
    };

    return (
      <div className="well" style={divStyle}>
            <button className="btn btn-default" onClick={this._onClick}>
                <i className={iconClasses}></i>
            </button>
            <textarea className="form-control" value={message} disabled='true' rows="5"/>
      </div>
    );
  }

});

export default RecorderTranscriptComponent;