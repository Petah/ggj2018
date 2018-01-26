const logger = require('./logger')(__filename);
const MovableGameObject = require('../game-objects/movable-game-object');
const Unit = require('../game-objects/unit-classes/unit');
const KamikazeUnit = require('../game-objects/unit-classes/kamikaze-unit');
const MissileUnit = require('../game-objects/unit-classes/missile-unit');

module.exports = class Client {
    constructor(game, server, webSocketClient, id) {
        this.game = game;
        this.server = server;
        this.webSocketClient = webSocketClient;
        this.id = id;
        this.nextUpdate = 0;

        this.speed = 200;
        this.unit = new MissileUnit(this.game, 500, 500, 0, 2, 0, 0);
        this.game.gameObjects.push(this.unit);

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
                    logger.log('Client view', message.data);
                    this.view.x = message.data.x;
                    this.view.y = message.data.y;
                    this.view.width = message.data.width;
                    this.view.height = message.data.height;
                    break;
                }

                case 'updateInput': {
                    this.unit.xVelocity = message.data.move.x * this.speed;
                    this.unit.yVelocity = message.data.move.y * this.speed;
                    if (message.data.shoot) {
                        this.unit.attack(10, 10);
                    }
                }
            }
        });
    }

    loop(deltaTime, currentTime) {
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
                    this.game.gameObjects[i].direction,
                    this.game.gameObjects[i].sprite,
                ]);
            }
        }
        this.send('update', updates);
        this.nextUpdate = currentTime + 0.016;
    }

    send(type, data) {
        this.webSocketClient.send(JSON.stringify({
            type: type,
            data: data,
        }));
    }
}
