const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

class FOVPowerUp extends GameObject {
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
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.duration = duration;
        this.increase = increase;
        this.timeElapsed = 0;
        this.isActive = false;
        this.type = 'FOVPowerUp';
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
                        this.onCollisionWithUnit(collisions[i]);
                        break;
                }
            }
        }

        if (this.isActive) {
            this.timeElapsed += deltaTime;
            if (this.timeElapsed >= this.duration) {
                //zoom camera back in
                this.isActive = false;
            }
        }
    }

    onCollisionWithUnit(unit) {
        // zoom camera out
    }
}