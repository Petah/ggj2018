let nextId = 1;

module.exports = class GameObject {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius
    ){
        if (!sprite) {
            throw new Error('Invalid sprite');
        }
        this.id = nextId++;
        this.game = game;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.direction = direction;
        this.collisionRadius = this.collisionRadius;
    }

    loop(deltaTime, currentTime) {

    }
}
