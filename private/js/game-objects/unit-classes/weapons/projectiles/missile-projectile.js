const Projectile = require("./projectile");
const math = require("../../../../utilities/math");

module.exports = class MissileProjectile extends Projectile {
    constructor(
        game,
        x,
        y,
        direction,
    ) {
        const speed = 500;
        super(game, x, y, direction, 4, math.lengthDirX(speed, direction), math.lengthDirY(speed, direction));
        this.subType = 'missile';
    }
}
