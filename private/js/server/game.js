const logger = require('./logger')(__filename);
const Server = require('./server');
const MovableGameObject = require('../game-objects/movable-game-object');
const BulletHellPowerUp = require('../game-objects/powerups/bullet-hell-powerup');
const FOVPowerUp = require('../game-objects/powerups/fov-powerup');
const FauxPowerUp = require('../game-objects/powerups/faux-powerup');
const SpeedPowerUp = require('../game-objects/powerups/speed-powerup');
const ShieldPowerUp = require('../game-objects/powerups/shield-powerup');
const Team = require('../player-collections/team');
const Spawner = require('../game-objects/spawner');
const SatellitePart = require('../game-objects/powerups/satellite-part');
const math = require('../utilities/math');

module.exports = class Game {
    constructor() {
        this.server = new Server(this);
        this.teamAmount = 2;
        this.teams = [];
        this.gameObjects = [];
        this.gameObjectsToRemove = [];

        this.mapWidth = 2000;
        this.mapHeight = 2000;

        this.powerUpCooldown = 0;
        this.collisions = {};
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
            this.deltaTime = this.currentTime - previousTime;
            previousTime = this.currentTime;
            updates++;

            if (lastSecond <= this.currentTime - 1) {
                lastSecond = this.currentTime;
                logger.log('UPS', updates);
                updates = 0;
            }

            this.collisionCheck();
            this.loop(this.deltaTime, this.currentTime);
            if (this.gameObjectsToRemove.length > 0) {
                logger.log('Remove', this.gameObjectsToRemove);
                this.gameObjects = this.gameObjects.filter(gameObject => this.gameObjectsToRemove.indexOf(gameObject.id) === -1);
                this.gameObjectsToRemove = [];
            }
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

        this.powerUpCooldown -= deltaTime;
        if (this.powerUpCooldown <= 0) {
            this.spawnPowerUp();
        }
    }

    reset() {
        logger.log('Game reset');
        this.gameObjects = [];
        this.teams = [];

        this.initTeams();
        this.spawnSatelliteParts();
        // this.initializeMapObjects();
    }

    initTeams() {
        let t = this.teamAmount;
        while (t--) {
            let x = (((Math.round(t + 1) % 2) * this.mapWidth) * 0.9) + (this.mapWidth * 0.1);

            if(((Math.round(t + 1) % 2) !== 0)) {
                x = this.mapWidth * 0.9;
            }

            let y = this.mapHeight * 0.5
            const spawner = new Spawner(
                this,
                x,
                y,
                0,
                1, // Sprite
                30,
            );
            this.gameObjects.push(spawner);
            this.teams.push(new Team(this, t, spawner));
        }
    }


    spawnSatelliteParts() {
        let i = 0;
        while (i < 4) {
            i++;
            let x = Math.random() * this.mapWidth;
            let y = Math.random() * this.mapHeight;
            this.gameObjects.push(new SatellitePart(this, x, y));
            console.log('spawing part at: ' + x + ' ' + y);
        }
    }

    spawnPowerUp() {
        this.powerUpCooldown = 20;
        const x = Math.random() * (this.mapWidth * 0.8);
        const y = Math.random() * (this.mapHeight * 0.8);

        const types = [
            // BulletHellPowerUp,
            // ShieldPowerUp,
            SpeedPowerUp,
            // FauxPowerUp,
        ];

        const powerUp = types[Math.floor(Math.random() * types.length)];
        this.gameObjects.push(new powerUp(this, x, y));
    }

    removeGameObject(gameObject) {
        this.gameObjectsToRemove.push(gameObject.id);
    }

    playAudioAtPoint(audioClip, x, y) {
        this.server.send('playAudioAtPoint', {
            audioClip,
            x,
            y,
        });
    }

    collisionCheck() {
        this.collisions = {};
        let g = this.gameObjects.length;
        while (g--) {
            this.collisions[this.gameObjects[g].id] = this.checkCollision(this.gameObjects[g]);
        }
    }

    checkCollision(gameObject) {
        const result = [];
        let i = this.gameObjects.length;
        while (i--) {
            if (gameObject.id === this.gameObjects[i].id) {
                continue;
            }
            const distance = math.pointDistance(gameObject.x, gameObject.y, this.gameObjects[i].x, this.gameObjects[i].y);
            if (distance < gameObject.collisionRadius + this.gameObjects[i].collisionRadius) {
                result.push(this.gameObjects[i]);
            }
        }
        return result;
    }
}
