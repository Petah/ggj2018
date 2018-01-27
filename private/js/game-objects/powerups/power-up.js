const GameObject = require('../game-object');

module.exports = class PowerUp extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration,
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.duration = duration;
        this.type = 'PowerUp';
        this.layer = 'map';
    }
}