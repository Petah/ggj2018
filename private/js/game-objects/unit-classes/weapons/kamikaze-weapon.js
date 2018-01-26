const Weapon = require("./weapon");
const Projectile = require("./projectiles/projectile");

module.exports = class KamikazeWeapon extends Weapon {
    constructor() {
        super(100)
    }
}