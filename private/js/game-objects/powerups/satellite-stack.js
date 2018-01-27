const GameObject = require('../game-object');
const collision = require("../../utilities/collision");
const Satellite = require('./satellite');

class SatelliteStack extends GameObject {
    constructor(game,
                x,
                y,
                direction,
                sprite,
                collisionRadius) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.currentSize = 0;
        this.maxSize = Satellite.REQUIRED_PARTS;
        this.type = 'SatellitePart';
    }

    addPart(team) {
        if (this.currentSize++ === this.maxSize) {
            new Satellite(this.game,
                this.x,
                this.y,
                this.direction,
                'satellite-sprite-path',
                this.collisionRadius,
                team);
        }
    }

    removePart() {
        this.currentSize--;
    }
}