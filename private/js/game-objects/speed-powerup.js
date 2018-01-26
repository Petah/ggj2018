const GameObject = require('./game-object');

class SpeedPowerup extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        duration
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
        let increase = 5;

        unit.xVelocity += increase;
        unit.yVelocity += increase;

        setTimeout(() => {
            unit.xVelocity -= increase;
            unit.yVelocity -= increase;
        }, this.duration);

        //destroy()?? dont wanna render anymore
    }
}