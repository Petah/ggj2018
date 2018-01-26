const GameObject = require("../game-object")

module.exports = class extends GameObject{
    constructor(
        xVelocity,
        yVelocity
    ){
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    move(deltaTime){
        this.x += (xVelocity * deltaTime);
        this.y += (yVelocity * deltaTime);
    }
}