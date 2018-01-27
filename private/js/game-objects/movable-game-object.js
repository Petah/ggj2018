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
        yVelocity,
    ) {
        super(game, x, y, direction, sprite);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.acceleration = 4000;
        this.maxSpeed = 400;
        this.xAcceleration = 0;
        this.yAcceleration = 0;
        this.friction = 5;
    }

    accelerate(xAcceleration, yAcceleration) {
        this.xAcceleration = xAcceleration;
        this.yAcceleration = yAcceleration;
    }

    loop(deltaTime, currentTime) {
        // Acceleration
        this.xVelocity += this.xAcceleration * this.acceleration * deltaTime;
        this.yVelocity += this.yAcceleration * this.acceleration * deltaTime;
        if (this.xVelocity > this.maxSpeed) {
            this.xVelocity = this.maxSpeed;
        }
        if (this.xVelocity < -this.maxSpeed) {
            this.xVelocity = -this.maxSpeed;
        }
        if (this.yVelocity > this.maxSpeed) {
            this.yVelocity = this.maxSpeed;
        }
        if (this.yVelocity < -this.maxSpeed) {
            this.yVelocity = -this.maxSpeed;
        }

        // Friction
        // if (!this.xAcceleration && !this.yAcceleration) {
            this.xAcceleration /= 1 + this.friction * deltaTime;
            this.yAcceleration /= 1 + this.friction * deltaTime;
            this.xVelocity /= 1 + this.friction * deltaTime;
            this.yVelocity /= 1 + this.friction * deltaTime;
        // }

        this.oldX = this.x;
        this.oldY = this.y;
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
        if (this.oldX != this.x || this.oldY != this.y) {
            this.direction = math.pointDirection(this.oldX, this.oldY, this.x, this.y);
            while (this.direction < 0) {
                this.direction += 360;
            }

            while (this.direction >= 360) {
                this.direction -= 360;
            }
        }
    }
}
