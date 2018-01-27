const GameObject = require('../game-object');
const SatelliteDish = require('private/js/game-objects/powerups/satellite');
const collision = require("../../utilities/collision");
const Satellite = require('satellite');

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
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
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
                        this.onCollisionWithUnit(collisions[i]);
                        break;
                }
            }
        }
    }

    onCollisionWithUnit(unit) {
        if (unit.team.satelliteParts++ === Satellite.REQUIRED_PARTS) {
            new SatelliteDish(this.game,
                this.x,
                this.y,
                this.direction,
                'satellite-sprite-path',
                this.collisionRadius,
                unit.team);
        } else {
            console.log('Collected another part');
        }
        //destroy()?? dont wanna render anymore
    }
}