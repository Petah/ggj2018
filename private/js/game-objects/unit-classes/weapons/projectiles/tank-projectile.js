const Projectile = require("./projectile");

module.exports = class TankProjectile extends Projectile {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
    ) {
        super(game, x, y, direction, sprite);
        this.energy = 50;
        this.collisionRadius = 100;
        this.subType = 'tank';
    }
}