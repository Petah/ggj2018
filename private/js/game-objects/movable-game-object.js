const GameObject = require('./game-object');

module.exports = class extends GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity
    ) {
        super(game, x, y, direction, sprite);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    loop(deltaTime, currentTime) {
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
    }
}
