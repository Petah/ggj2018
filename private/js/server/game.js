const logger = require('./logger')(__filename);
const Server = require('./server');
const MovableGameObject = require('../game-objects/movable-game-object');
const Unit = require('../game-objects/unit-classes/unit');

module.exports = class Game {
    constructor() {
        this.server = new Server(this);
    }

    start() {
        logger.log('Game start');
        this.server.start();

        this.gameObjects = [];

        let lastSecond = 0;
        const hrTimeInit = process.hrtime();
        let previousTime = hrTimeInit[0] + hrTimeInit[1] / 1000000000;
        let updates = 0;
        const gameLoop = () => {
            const hrTime = process.hrtime();
            this.currentTime = hrTime[0] + hrTime[1] / 1000000000;
            const deltaTime = this.currentTime - previousTime;
            previousTime = this.currentTime;
            updates++;

            if (lastSecond <= this.currentTime - 1) {
                lastSecond = this.currentTime;
                logger.log('UPS', updates);
                updates = 0;
            }

            this.loop(deltaTime, this.currentTime);
            this.id = setImmediate(gameLoop);
        };
        this.id = setImmediate(gameLoop);
    }

    stop() {
        logger.log('');
        logger.log('Game stop');
        this.server.stop();

        clearImmediate(this.id);
        this.id = null;
    }

    loop(deltaTime, currentTime) {
        // process.stdout.write('.');
        let i = this.gameObjects.length;
        while (i--) {
            this.gameObjects[i].loop(deltaTime, currentTime);
        }
        this.server.loop(deltaTime, currentTime);
    }

    reset() {
        logger.log('Game reset');
        this.gameObjects = [];
    }
}
