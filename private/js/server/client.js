const logger = require('./logger')(__filename);
const WebSocket = require('ws');
const MovableGameObject = require('../game-objects/movable-game-object');
const Player = require('../player-collections/player');

module.exports = class Client {
    constructor(game, server, webSocketClient, id) {
        this.game = game;
        this.server = server;
        this.webSocketClient = webSocketClient;
        this.id = id;
        this.nextUpdate = 0;

        this.players = {};
        this.speed = 200;
        // this.unit = new MissileUnit(this.game, 500, 500, 0, 2, 0, 0);
        // this.game.gameObjects.push(this.unit);

        this.view = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        };

        this.webSocketClient.on('message', (message) => {
            message = JSON.parse(message);
            // logger.log('Client message', message);
            switch (message.type) {
                case 'reset': {
                    this.game.reset();
                    break;
                }

                case 'view': {
                    logger.log('Client view', message.data);
                    this.view.x = message.data.x;
                    this.view.y = message.data.y;
                    this.view.width = message.data.width;
                    this.view.height = message.data.height;
                    break;
                }

                case 'updateInput': {
                    const player = this.players[message.data.id];
                    if (message.data.switchUnit) {
                        this.game.teams[0].nextUnit(player);
                    }
                    if (player && player.unit) {
                        player.unit.accelerate(message.data.move.x, message.data.move.y);
                        if (message.data.shoot) {
                            player.unit.attack(10, 10);
                        }
                    }
                    break;
                }

                case 'createPlayer': {
                    logger.log('Create player', message.data);
                    const player = new Player(this.game, message.data.id)
                    this.players[message.data.id] = player;
                    this.game.teams[0].addPlayer(player);
                    break;
                }
            }
        });
    }

    loop(deltaTime, currentTime) {
        if (this.game.gameObjects.length) {
            const averageX = this.game.gameObjects.reduce((p, c) => c.x + p, 0) / this.game.gameObjects.length;
            const averageY = this.game.gameObjects.reduce((p, c) => c.y + p, 0) / this.game.gameObjects.length;
            this.view.x = averageX - this.view.width / 2;
            this.view.y = averageY - this.view.height / 2;
        }
        for (let id in this.players) {
            if (this.players[id].unit) {
                this.view.x = this.players[id].unit.x - this.view.width / 2;
                this.view.y = this.players[id].unit.y - this.view.height / 2;
            }
        }

        let hud = {
            canPickUp: false,
            isStealing: false,
            stealType: null
        };

        const padding = 200;
        const updates = [];
        let i = this.game.gameObjects.length;
        while (i--) {
            if (
                this.game.gameObjects[i].x > this.view.x - padding &&
                this.game.gameObjects[i].x < this.view.x + this.view.width + (padding * 2) &&
                this.game.gameObjects[i].y > this.view.y - padding &&
                this.game.gameObjects[i].y < this.view.y + this.view.height + (padding * 2)
            ) {
                updates.push([
                    this.game.gameObjects[i].id,
                    this.game.gameObjects[i].x,
                    this.game.gameObjects[i].y,
                    this.game.gameObjects[i].layer,
                    this.game.gameObjects[i].sprite,
                    this.game.gameObjects[i].moving
                ]);
            }

            if (this.game.gameObjects[i].canPickUpPart) {
                hud.canPickUp = true;
            }

            if (this.game.gameObjects[i].isStealing) {
                hud.isStealing = true;
                hud.stealType = this.game.gameObjects[i].type;
            }
        }
        this.send('hud', hud);
        this.send('update', {
            renderer: {
                x: this.view.x,
                y: this.view.y,
                zoom: 1,
            },
            updates: updates,
        });
        this.nextUpdate = currentTime + 0.016;
    }

    send(type, data) {
        if (this.webSocketClient.readyState !== WebSocket.OPEN) {
            logger.log('Socket not ready')
            return;
        }
        this.webSocketClient.send(JSON.stringify({
            type: type,
            data: data,
        }));
    }
}
