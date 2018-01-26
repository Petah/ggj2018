const logger = require('./logger')(__filename);
const WebSocket = require('ws');
const MovableGameObject = require('../game-objects/movable-game-object');
const Unit = require('../game-objects/unit-classes/unit');
const KamikazeUnit = require('../game-objects/unit-classes/kamikaze-unit');
const MissileUnit = require('../game-objects/unit-classes/missile-unit');
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
                case 'view': {
                    this.game.reset();
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
                    player.units[0].accelerate(message.data.move.x, message.data.move.y);
                    if (message.data.shoot) {
                        player.units[0].attack(10, 10);
                    }
                    break;
                }

                case 'createPlayer': {
                    logger.log('Create player', message.data);
                    const player = new Player(this.game)
                    this.players[message.data.id] = player;
                    break;
                }
            }
        });
    }

    loop(deltaTime, currentTime) {
        this.view.x = this.game.gameObjects[0] ? this.game.gameObjects[0].x - this.view.width / 2 : 0;
        this.view.y = this.game.gameObjects[0] ? this.game.gameObjects[0].y - this.view.height / 2 : 0;

        const updates = [];
        let i = this.game.gameObjects.length;
        while (i--) {
            if (
                this.game.gameObjects[i].x > this.view.x &&
                this.game.gameObjects[i].x < this.view.x + this.view.width &&
                this.game.gameObjects[i].y > this.view.y &&
                this.game.gameObjects[i].y < this.view.y + this.view.height
            ) {
                updates.push([
                    this.game.gameObjects[i].id,
                    this.game.gameObjects[i].x,
                    this.game.gameObjects[i].y,
                    0,
                    this.game.gameObjects[i].sprite,
                ]);
            }
        }
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
