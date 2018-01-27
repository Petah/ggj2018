const Weapon = require("./weapon");

module.exports = class TankWeapon extends Weapon {
    constructor(game, unit) {
        super(game, unit)
    }

    spawnProjectile(x, y, direction) {
        this.game.gameObjects.push(new MissileProjectile(this.game, x, y, this.unit.direction));
    }
}