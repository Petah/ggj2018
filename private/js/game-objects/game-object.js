module.exports = class GameObject {
    constructor(
        x,
        y,
        direction,
        sprite,
        collisionRadius
    ){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.direction = direction;
        this.collisionRadius = this.collisionRadius;
    }

    loop(deltaTime, currentTime) {

    }
}
