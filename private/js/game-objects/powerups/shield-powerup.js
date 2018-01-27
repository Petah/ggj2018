const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

module.exports = class ShieldPowerUp extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration,
        healthIncrease
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.duration = duration;
        this.healthIncrease = healthIncrease;
        this.type = 'ShieldPowerUp';
    }

    onCollisionWithUnit(unit) {
        unit.health += this.healthIncrease;
    }
}