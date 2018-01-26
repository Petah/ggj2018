const Weapon = require("./weapon");
const Projectile = require("./projectiles/projectile"); 

module.export = class KamikazeWeapon extends Weapon {
    constructor() {
        super(100)
    }
}