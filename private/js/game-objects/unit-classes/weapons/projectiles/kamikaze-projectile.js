const Projectile = require("./projectile");

module.exports = class KamikazeProjectile extends Projectile {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
    ) {
        super(game, x, y, direction, sprite);
    }
}