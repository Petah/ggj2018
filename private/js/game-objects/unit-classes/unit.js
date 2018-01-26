const MoveableGameObject = require("./moveable-game-object")
const Weapon = require("./weapon")

module.export = class Unit {
    constructor(team
        , teamColor
        , weaponArray) {
        this.team        = team;
        this.x           = x;
        this.y           = y;
        this.sprite      = sprite;
        this.teamColor   = teamColor;
        this.weaponArray = weaponArray;
    }

    attack(enemyX, enemyY) {
        let distance = Math.hypot(this.x, enemyX, this.y, enemyY);

        let oneWeaponInRange = false;
        let i = this.weaponArray.length;
        while(i--) {
            let weapon = this.weaponArray[i];
            if(weapon.range > distance) {
                weapon.fire(this.x, this.y, enemyX, enemyY);
            }
        }
    }
}