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
        // this.testFire();
    }

    // testFire(){
    //     new Projectile(this.game,this.x,this.y,10,-10,2);
    // }
}
