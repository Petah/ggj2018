const logger = require('./logger')(__filename);
const Server = require('./server');

module.exports = class Game {
    constructor() {
        this.server = new Server(this);
    }

    start() {
        logger.log('Game start');
        this.server.start();

        this.gameObjects = [

        ];

        let lastSecond = 0;
        let previousTime = 0;
        let updates = 0;
        const gameLoop = () => {
            const hrTime = process.hrtime();
            const currentTime = hrTime[0] + hrTime[1] / 1000000000;
            const deltaTime = currentTime - previousTime;
            previousTime = currentTime;
            updates++;

            if (lastSecond <= currentTime - 1) {
                lastSecond = currentTime;
                logger.log('UPS', updates);
                updates = 0;
            }

            this.loop(deltaTime, currentTime);
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
}
