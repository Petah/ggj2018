const MovableGameObject = require("../../../movable-game-object")

module.exports = class Projectile extends MovableGameObject {
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
        damageSprite
    ) {
        super(game, x, y, direction, sprite, xVelocity, yVelocity);
        this.damage = damage;
        this.range = range;
        this.areaOfEffect = areaOfEffect;
        this.travelledDistance = 0;
        this.type = 'projectile';
    }

    move(deltaTime) {
        deltaX = (xVelocity * deltaTime);
        deltaY = (yVelocity * deltaTime);
        this.travelledDistance += Math.hypot(this.x, (this.x + deltaX), this.y, ((this.y + deltaY)));

        if (travelledDistance > range) {
            onCollisionWithNonDamageableGameObject(null);
        } else {
            this.x += (this.xVelocity * deltaTime);
            this.y += (this.yVelocity * deltaTime);
        }
    }

    showDamageAnimation() {
    }

    onCollisionWithUnit(unit) {
        unit.getHurt(this);
        this.showDamageAnimation();
    }

    onCollisionWithNonDamageableGameObject(gameObject) {
        this.showDamageAnimation();
    }

}