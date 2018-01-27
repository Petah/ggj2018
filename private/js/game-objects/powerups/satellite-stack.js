const GameObject = require('../game-object');
const Satellite = require('./satellite');

module.exports = class SatelliteStack extends GameObject {
    constructor(
        game,
        x,
        y,
        team,
    ) {
        super(game, x, y, 0, 2, 5);
        this.team = team;
        this.currentSize = 0;
        this.maxSize = Satellite.REQUIRED_PARTS;
        this.type = 'SatelliteStack';
        this.layer = 'map';
    }

    addPart(team) {
        if (this.currentSize++ === this.maxSize) {
            this.game.gameObjects.push(new Satellite(this.game,
                this.x,
                this.y,
                this.direction,
                'satellite-sprite-path',
                this.collisionRadius,
                team));
        } else {
            this.sprite++;
        }
    }

    removePart() {
        this.currentSize--;
    }
}
