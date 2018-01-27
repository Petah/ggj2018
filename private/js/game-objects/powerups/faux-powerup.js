const PowerUp = require('./power-up');

module.exports = class FauxPowerUp extends PowerUp {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration,
        healthDecrease
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.duration = duration;
        this.healthDecrease = healthDecrease;
        this.type = 'FauxPowerUp';
    }

    onCollisionWithUnit(unit) {
        unit.health -= this.healthDecrease;
    }
}