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
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.duration = duration;
        this.healthDecrease = healthDecrease;
        this.type = 'FauxPowerUp';
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

        if (Math.round(currentTime) % 5 === 0) {
            //this.sprite = bomb sprite;
        } else {
            //this.sprite = sheild powerup sprite
        }
    }

    onCollisionWithUnit(unit) {
        unit.health -= this.healthDecrease;
    }
}