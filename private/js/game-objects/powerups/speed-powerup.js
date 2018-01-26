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
        this.timeElapsed = 0;
        this.isActive = false;
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
                        var unit = collisions[i];
                        this.onCollisionWithUnit(unit);
                        break;
                }
            }
        }

        if (isActive) {
            this.timeElapsed+=deltaTime;
            if (this.timeElapsed >= this.duration) {
                unit.xVelocity -= this.speedIncrease;
                unit.yVelocity -= this.speedIncrease;
                this.isActive = false;
            }
        }

    }

    onCollisionWithUnit(unit) {
        if (!this.isActive) {
            this.isActive = true;
            unit.xVelocity += this.speedIncrease;
            unit.yVelocity += this.speedIncrease;
        }
        //destroy()?? dont wanna render anymore
    }
}