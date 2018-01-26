const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

class BulletHellPowerUp extends GameObject {
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
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.duration = duration;
        this.type = 'BulletHell';
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
        let currentFireRate = unit.weapon.fireRate;
        unit.weapon.fireRate = 1;

        setTimeout(() => {
            unit.weapon.fireRate = currentFireRate;
        }, this.duration);
        //destroy()?? dont wanna render anymore
    }
}