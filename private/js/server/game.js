const logger = require('./logger')(__filename);
const Server = require('./server');
const MovableGameObject = require('../game-objects/movable-game-object');
const BulletHellPowerUp = require('../game-objects/powerups/bullet-hell-powerup');
const Team = require('../player-collections/team');

module.exports = class Game {
    constructor() {
        this.server = new Server(this);
        this.teamAmount = 2;
        this.teams = [];
        this.gameObjects = [];
    }

    start() {
        logger.log('Game start');
        this.server.start();

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
        let t = this.teams.length;
        while (t--) {
            this.teams[t].loop(deltaTime, currentTime);
        }

        let g = this.gameObjects.length;
        while (g--) {
            this.gameObjects[g].loop(deltaTime, currentTime);
        }
        this.server.loop(deltaTime, currentTime);
    }

    reset() {
        logger.log('Game reset');
        this.gameObjects = [];
        this.teams = [];

        this.initTeams();
        // this.initializeMapObjects();
    }

    initTeams() {
        let i = this.teamAmount;
        while (i--) {
            this.teams.push(new Team(this, i));
        }
    }

    initializeMapObjects() {
        this.gameObjects.push(new BulletHellPowerUp(this,
            this.mapWidth / 2,
            this.mapHeight / 2,
            0,
            3,
            30,
            5));
    }

    spawnPowerUp() {
        let xDistFromCenter = Math.random() * (this.mapWidth * 0.8);
        let yDistFromCenter = Math.random() * (this.mapHeight * 0.8);

        let randomPowerUp = Math.random();

        if (randomPowerUp <= 0.2) {
            this.gameObjects.push(new BulletHellPowerUp(this,
                this.mapWidth / 2,
                this.mapHeight / 2,
                0,
                3,
                30,
                5));
        } else if (randomPowerUp <= 0.4) {
            this.gameObjects.push(new FOVPowerUp(
                this,
                this.mapWidth / 2,
                this.mapHeight / 2,
                0,
                3,
                30,
                10));
        } else if (randomPowerUp <= 0.6) {
            this.gameObjects.push(new ShieldPowerUp(
                this,
                this.mapWidth / 2,
                this.mapHeight / 2,
                0,
                3,
                30,
                10,
                100));
        } else if (randomPowerUp <= 0.8) {
            this.gameObjects.push(new SpeedPowerUp(
                this,
                this.mapWidth / 2,
                this.mapHeight / 2,
                0,
                3,
                30,
                10,
                100));
        } else {
            this.gameObjects.push(new FauxPowerUp(
                this,
                this.mapWidth / 2,
                this.mapHeight / 2,
                0,
                3,
                30,
                10));
        }
    }
}
