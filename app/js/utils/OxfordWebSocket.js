class OxfordWebSocket {
    constructor() {
        this.oxfordUri = 'wss://www.projectoxford.ai/ws/Speech?language=en-US';
        this.websocket = null;
    }

    open(onOpen, onMessage, onClose) {
        var self = this;

        this.websocket = new WebSocket(this.oxfordUri);
        this.websocket.onopen = function () { onOpen(self.websocket) };
        this.websocket.onmessage = function(event) {
            var data = event.data.toString();
            if (data == null || data.length <= 0) {
                return;
            }

            onMessage(data)
        };
        this.websocket.onclose = onClose;
    }

    close() {
        if (this.websocket) {
            this.websocket.close();
            this.websocket.onmessage = function () { };
            this.websocket.onerror = function () { };
            this.websocket.onclose = function () { };
        }
    }
}

export default OxfordWebSocket