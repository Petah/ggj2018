const GameObject = require('./game-object');

module.exports = class extends GameObject {
    constructor(
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity
    ) {
        super(x, y, direction, sprite);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    loop(deltaTime, currentTime) {
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
    }
}
