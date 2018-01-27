const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

module.exports = class FauxPowerUp extends GameObject {
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