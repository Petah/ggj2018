const GameObject = require('./game-object');
const math = require('../utilities/math');

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
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
        if (this.oldX != this.x || this.oldY != this.y) {
            this.direction = math.pointDirection(this.oldX, this.oldY, this.x, this.y);
        }
    }
}
