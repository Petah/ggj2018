const GameObject = require('../game-object');

module.exports = class FOVPowerUp extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration,
        increase
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.duration = duration;
        this.increase = increase;
        this.timeElapsed = 0;
        this.isActive = false;
        this.type = 'FOVPowerUp';
    }

    onCollisionWithUnit(unit) {
        // zoom camera out
    }
}