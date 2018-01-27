const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

module.exports = class SpeedPowerUp extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration,
        speedIncrease
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.duration = duration;
        this.speedIncrease = speedIncrease;
        this.timeElapsed = 0;
        this.isActive = false;
        this.type = 'SpeedPowerUp';
    }

    onCollisionWithUnit(unit) {
        if (!this.isActive) {
            this.isActive = true;
            this.unit = unit;
            this.unit.xVelocity += this.speedIncrease;
            this.unit.yVelocity += this.speedIncrease;
        }
        //destroy()?? dont wanna render anymore
    }
}