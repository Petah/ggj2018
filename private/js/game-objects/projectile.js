const MoveableGameObject = require("./moveable-game-object")

class Projectile extends MoveableGameObject{

    constructor(x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        damage,
        range,
        areaOfEffect) {
            super(x, y, direction, sprite, xVelocity, yVelocity);
            this.damage = damage;
            this.range = range;
            this.areaOfEffect = areaOfEffect;
            this.travelledDistance = 0;
        }


    move(deltaTime) {
        deltaX = (xVelocity * deltaTime);
        deltaY = (yVelocity * deltaTime);
        this.travelledDistance += Math.hypot(this.x, (this.x + deltaX), this.y, ((this.y + deltaY)));

        if(travelledDistance > range) {
            onCollision();
        }

        this.x += (xVelocity * deltaTime);
        this.y += (yVelocity * deltaTime);
    }

    onCollision(unit) {

    }
}