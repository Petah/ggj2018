const logger = require('./logger')(__filename);
const Server = require('./server');
const MovableGameObject = require('../game-objects/movable-game-object');
const Unit = require('../game-objects/unit-classes/unit');
const BulletHellPowerUp = require('../powerups/bullet-hell-powerup');
const FOVPowerUp = require('../powerups/fov-powerup');
const FauxPowerUp = require('../po')

module.exports = class Game {
    constructor() {
        this.server = new Server(this);
        this.mapWidth  = 1920 * 5;
        this.mapHeight = 1080 * 3;
    }

    start() {
        logger.log('Game start');
        this.server.start();

        this.gameObjects = [];

        this.initializeMapObjects();

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

        if(Math.round(currentTime) % 15 == 0) {
            this.spawnPowerUp();
        }
    }

    initializeMapObjects() {
        this.gameObjects.push(new BulletHell(this,
            this.mapWidth/2,
            this.mapHeight/2,
            0,
            3,
            30,
            5));
    }

    spawnPowerUp() {
        let xDistFromCenter = Math.random() * (this.mapWidth  * 0.8);
        let yDistFromCenter = Math.random() * (this.mapHeight * 0.8);

        let randomPowerUp = Math.random();

        if (randomPowerUp <= 0.2) {
            this.gameObjects.push(new BulletHellPowerUp(this,
                this.mapWidth/2,
                this.mapHeight/2,
                0,
                3,
                30,
                5));
        } else if (randomPowerUp <= 0.4) {
            this.gameObjects.push(new FOVPowerup(
                this,
                this.mapWidth/2,
                this.mapHeight/2,
                0,
                3,
                30,
                10));
        } else if (randomPowerUp <= 0.6) {
            this.gameObjects.push(new FOVPowerup(
                this,
                this.mapWidth/2,
                this.mapHeight/2,
                0,
                3,
                30,
                10));
        } else if (randomPowerUp <= 0.8) {
            this.gameObjects.push(new FOVPowerup(
                this,
                this.mapWidth/2,
                this.mapHeight/2,
                0,
                3,
                30,
                10));
        } else {
            this.gameObjects.push(new FauxPowerUp(
                this,
                this.mapWidth/2,
                this.mapHeight/2,
                0,
                3,
                30,
                10));
        }
    }

    reset() {
        logger.log('Game reset');
        this.gameObjects = [];
    }
}
