const GameObject = require('../game-object');

module.exports = class SatellitePart extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.type = 'SatellitePart';
    }
}