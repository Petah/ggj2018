const MovableGameObject = require("./movable-game-object")
const Unit = require("./unit-classes/unit");
const collision = require("./../utilities/collision");

class Projectile extends MovableGameObject{
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        damage,
        range,
        areaOfEffect,
        damageSprite) {
            super(game,x, y, direction, sprite, xVelocity, yVelocity);
            this.damage = damage;
            this.range = range;
            this.areaOfEffect = areaOfEffect;
            this.travelledDistance = 0;
    }

    loop(deltaTime, currentTime) {
    }

    move(deltaTime) {
        deltaX = (xVelocity * deltaTime);
        deltaY = (yVelocity * deltaTime);
        this.travelledDistance += Math.hypot(this.x, (this.x + deltaX), this.y, ((this.y + deltaY)));

        if(travelledDistance > range) {
            onCollisionWithNonDamageableGameObject(null);
        } else {
            this.x += (this.xVelocity * deltaTime);
            this.y += (this.yVelocity * deltaTime);
        }
    }

    showDamageAnimation() {
        // poo.init();
    }

    onCollisionWithUnit(unit) {
        unit.getHurt(this);
        this.showDamageAnimation();
    }

    onCollisionWithNonDamageableGameObject(gameObject) {
        this.showDamageAnimation();
    }

}