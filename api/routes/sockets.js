const WebSocket = require('ws');
module.exports = class ArenaSocket {
    constructor() {
        this.socket = new WebSocket.Server({ port: 9000 });
        this.userSocketMap = new Map();
        this.initSocket();
    }
    initSocket() {
        this.socket.on('connection', ws => {
            ws.on('message', message => {
                console.log(message);
                this.userSocketMap.set(message, ws);
                this.notifyAll();
            });
            ws.on('close', () => {
                for (let [key, value] of this.userSocketMap) {
                    if (value == ws) {
                        this.userSocketMap.delete(key);
                        this.notifyAll();
                    }
                }
            });
        })
    }
    notifyAll() {
        var onlineUsers = [];
        for (let key of this.userSocketMap.keys()) {
            onlineUsers.push(key);
        }
        for (let ws of this.userSocketMap.values()) {
            ws.send(JSON.stringify(onlineUsers));
        }
    }
}
