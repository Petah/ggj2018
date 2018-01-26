const logger = require('./logger')(__filename);
const WebSocket = require('ws');
const Client = require('./client');

let nextId = 1;

module.exports = class Server {
    constructor(game) {
        this.game = game;
        this.clients = [];
    }

    start() {
        logger.log('Server starting');

        this.server = new WebSocket.Server({
            port: 8081,
        });

        this.server.on('connection', (webSocketClient) => {
            logger.log('Server connection');
            const id = nextId++;
            const client = new Client(this.game, this.server, webSocketClient, id);
            this.clients.push(client);

            webSocketClient.on('close', () => {
                logger.log('Server disconnect');
                this.removeClient(id);
            });

            webSocketClient.on('error', (error) => {
                logger.log('Server error');
                this.removeClient(id);
            });
        });

        this.server.on('error', (error) => {
            logger.log('Server error', error);
        });
    }

    stop() {
        this.server.close(() => {
            logger.log('Server stopped');
        })
    }

    loop(deltaTime, currentTime) {
        let i = this.clients.length;
        while (i--) {
            if (this.clients[i].nextUpdate < currentTime) {
                this.clients[i].loop(deltaTime, currentTime);
            }
        }
    }

    removeClient(id) {
        this.clients = this.clients.filter(client => client.id != id);
    }
}
