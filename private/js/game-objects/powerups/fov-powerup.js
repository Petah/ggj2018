const PowerUp = require('./power-up');

module.exports = class FOVPowerUp extends PowerUp {
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