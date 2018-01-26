const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

class SpeedPowerup extends GameObject {
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
        this.type = 'SpeedPowerup';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;
        while (i--) {
            if (collisions[i].id !== this.id) {
                switch(collisions[i].type) {
                    case 'Unit':
                        this.onCollisionWithUnit(collisions[i]);
                        break;
                }
            }
        }
    }

    onCollisionWithUnit(unit) {
        unit.xVelocity += this.speedIncrease;
        unit.yVelocity += this.speedIncrease;

        setTimeout(() => {
            unit.xVelocity -= this.speedIncrease;
            unit.yVelocity -= this.speedIncrease;
        }, this.duration);
        //destroy()?? dont wanna render anymore
    }
}