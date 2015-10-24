'use strict';

import ClassNames               from 'classnames';
import React                    from 'react/addons';
import RecorderTranscript       from './RecorderTranscript';
import WordFrequencyGraph       from './WordFrequencyGraph';
import OxfordWebSocket          from '../utils/OxfordWebSocket';
import Recorder                 from '../utils/Recorder';

const RecorderComponent = React.createClass({
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

    _onClick() {
        var self = this;
        this.setState({
            isRecording: !self.state.isRecording,
        }, function() {
            if (self.state.isRecording) {
                self._startRecording();
            } else {
                self._stopRecording();
            }
        });
    },

    _startRecording() {
        var self = this;

        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        navigator.getUserMedia(
            {"audio": true},
            function (stream) {
                var inputPoint = self.audioContext.createGain();
                self.audioRecorder = new Recorder(inputPoint);
                self.audioSource = stream;

                self.audioContext.createMediaStreamSource(stream).connect(inputPoint);
                self.oxfordWebSocket.open(
                    function(ws) {
                        self.audioRecorder.sendHeader(ws);
                        self.audioRecorder.record(ws);
                    },
                    self._gotMessage,
                    self._stopRecording);
            },
            function (e) {
              window.alert('Error: ' + e.name);
              self.setState({ isRecording: false });
            }
        );
    },

    _gotMessage(data) {
        var ch = data.charAt(0);
        var message = data.substring(1);
        if (ch == 'e') {
            this._stopRecording();
        } else {
            var text = this.messageHistory + message;
            if (ch == 'f') {
                this.messageHistory  = text + ' ';
            }

            this.setState({
                message: text,
            });
        }
    },

    _stopRecording() {
        if (this.audioSource && this.audioSource.active) {
            this.audioSource.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        this.audioRecorder.stop();
        this.oxfordWebSocket.close();
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

            <RecorderTranscript transcript={message} />
            <WordFrequencyGraph transcript={message} />
      </div>
    );
  }

});

export default RecorderComponent;
