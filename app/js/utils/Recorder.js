class Recorder {

    constructor(source) {
        var self = this;
        var bufferLen = 4096;

        this.recording = false;
        this.websocket = null;

        if (!source.context.createScriptProcessor) {
            this.node = source.context.createJavaScriptNode(bufferLen, 2, 2);
        } else {
            this.node = source.context.createScriptProcessor(bufferLen, 2, 2);
        }

        this.node.onaudioprocess = function (e) {
            if (!self.recording || self.websocket == null) return;

            var inputL = e.inputBuffer.getChannelData(0);
            var length = Math.floor(inputL.length / 3);
            var result = new Float32Array(length);

            var index = 0,
            inputIndex = 0;

            while (index < length) {
                result[index++] = inputL[inputIndex];
                inputIndex += 3;
            }

            var offset = 0;
            var buffer = new ArrayBuffer(length * 2);
            var view = new DataView(buffer);
            for (var i = 0; i < result.length; i++, offset += 2) {
                var s = Math.max(-1, Math.min(1, result[i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }

            self.websocket.send(view);
        }

        source.connect(this.node);
        this.node.connect(source.context.destination); 
    }

    record(ws) {
        this.recording = true;
        this.websocket = ws;
    }

    stop() {
        this.recording = false;
        this.node.disconnect(0);
    }

    sendHeader(ws) {
        var sampleLength = 1000000;
        var mono = true;
        var sampleRate = 16000;
        var buffer = new ArrayBuffer(44);
        var view = new DataView(buffer);

        /* RIFF identifier */
        this._writeString(view, 0, 'RIFF');
        /* file length */
        view.setUint32(4, 32 + sampleLength * 2, true);
        /* RIFF type */
        this._writeString(view, 8, 'WAVE');
        /* format chunk identifier */
        this._writeString(view, 12, 'fmt ');
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, mono ? 1 : 2, true);
        /* sample rate */
        view.setUint32(24, sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, sampleRate * 2, true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, 2, true);
        /* bits per sample */
        view.setUint16(34, 16, true);
        /* data chunk identifier */
        this._writeString(view, 36, 'data');
        /* data chunk length */
        view.setUint32(40, sampleLength * 2, true);

        ws.send(view);
    }

    _writeString(view, offset, string) {
        for (var i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
}

export default Recorder