const GameObject = require('./game-object');
const SatelliteDish = require('satellite-dish');

class SatellitePart extends GameObject {
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
    }

    onCollisionWithUnit(unit) {
        if (unit.team.satelliteParts++ === 4) {
            new SatelliteDish(this.game,
                this.x,
                this.y,
                this.direction,
                'satellite-sprite-path',
                this.collisionRadius,
                unit.team);
        }

        //destroy()?? dont wanna render anymore
    }
}