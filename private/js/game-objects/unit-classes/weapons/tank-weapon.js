const Weapon = require("./weapon");
const TankProjectile = require('./projectiles/tank-projectile');

module.exports = class TankWeapon extends Weapon {
    constructor(game, unit) {
        super(game, unit)
    }

    spawnProjectile(x, y, direction) {
        this.game.gameObjects.push(new TankProjectile(this.game, x, y, this.unit.direction,this.unit));
    }
}