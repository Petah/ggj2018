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
        let deltaX = (this.xVelocity * deltaTime);
        let deltaY = (this.yVelocity * deltaTime);
        this.travelledDistance += Math.hypot(this.x, (this.x + deltaX), this.y, ((this.y + deltaY)));

        console.log('deltax: ' + deltaX + ' deltay: ' + deltaY);
        console.log('x: ' + this.x + ' y: ' + this.y);
        console.log('distance travelled: ' + this.travelledDistance);

        if (this.travelledDistance > this.range) {
            this.onCollisionWithNonDamageableGameObject(null);
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