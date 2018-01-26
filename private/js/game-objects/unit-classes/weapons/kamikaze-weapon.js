const Weapon = require("./weapon");
const KamikazeProjectile = require("./projectiles/kamikaze-projectile");

module.exports = class KamikazeWeapon extends Weapon {
    constructor(game, x, y, direction, sprite) {
        let projectile = new KamikazeProjectile(game, x, y, direction, sprite);

        super(100, projectile);
    }

    fire(direction) {
        // Spawn projectiles
    }
}