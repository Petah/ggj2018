const GameObject = require('../game-object');
const collision = require("../../utilities/collision");

module.exports = class SatellitePart extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.type = 'SatellitePart';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;

        while (i--) {
            if (collisions[i].id !== this.id) {
                switch(collisions[i].type) {
                    case 'Unit':
                        break;
                }
            }
        }
    }
}