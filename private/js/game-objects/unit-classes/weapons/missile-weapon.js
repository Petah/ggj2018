const Weapon = require("./weapon");
const MissileProjectile = require("./projectiles/missile-projectile");

module.exports = class MissileLauncher extends Weapon {
    constructor(game, unit) {
        super(game, unit)
        this.audioClip = 'shoot-1';
    }

    spawnProjectile(x, y, direction) {
        this.game.gameObjects.push(new MissileProjectile(this.game, x, y, this.unit.direction));
    }
}
