const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

module.exports = class BulletHellPowerUp extends GameObject {
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
        this.type = 'BulletHellPowerUp';

        this.startTime = -1;
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